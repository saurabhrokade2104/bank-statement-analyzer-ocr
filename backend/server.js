require("dotenv").config();
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const Tesseract = require("tesseract.js");
const cors = require("cors");
const BankStatement = require("./models/BankStatement"); // your schema

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// MongoDB connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Multer setup
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const upload = multer({ dest: uploadDir });

// Helper: parse text for analysis fields
function parseBankText(text) {
  // Simple regex extraction examples (adjust to your bank statements)
  return {
    salaried: {
      dateOfAccountOpened: text.match(/Date of Account Opened:\s*(.*)/)?.[1] || "",
      salaryCreditedDate: text.match(/Salary Credited Date:\s*(.*)/)?.[1] || "",
      averageMonthlyBalance: text.match(/Average Monthly Balance:\s*(.*)/)?.[1] || "",
      ontimeEMIPayments: text.match(/On[- ]?time EMI Payments:\s*(.*)/)?.[1] || "",
      overdueEMIPayments: text.match(/Overdue EMI Payments:\s*(.*)/)?.[1] || "",
      chequeBounceNumber: text.match(/Cheque Bounce Number:\s*(.*)/)?.[1] || "",
      salaryMatch: text.match(/Salary Match:\s*(.*)/)?.[1] || "",
      spendingSavingsPatterns: text.match(/Spending\/Savings Patterns:\s*(.*)/)?.[1] || "",
    },
    salariedRisk: {
      personalBehavioralStatus: text.match(/Personal Behavioral Status:\s*(.*)/)?.[1] || "",
      personalRiskStatusLegal: text.match(/Personal Risk Status \(Legal\):\s*(.*)/)?.[1] || "",
      jobStability: text.match(/Job Stability:\s*(.*)/)?.[1] || "",
      creditScoreStability: text.match(/Credit Score Stability:\s*(.*)/)?.[1] || "",
      incomeStability: text.match(/Income Stability:\s*(.*)/)?.[1] || "",
      presentObligations: text.match(/Present Obligations:\s*(.*)/)?.[1] || "",
      paymentRepaymentAbility: text.match(/Payment Repayment Ability:\s*(.*)/)?.[1] || "",
      residentialAreaRisk: text.match(/Residential Area Risk:\s*(.*)/)?.[1] || "",
      finalDecisionForCredit: text.match(/Final Decision for Credit:\s*(.*)/)?.[1] || "",
    },
    business: {
      dateOfAccountPull: text.match(/Date of Account Pull:\s*(.*)/)?.[1] || "",
      creditEntry: text.match(/Credit Entry:\s*(.*)/)?.[1] || "",
      debitEntry: text.match(/Debit Entry:\s*(.*)/)?.[1] || "",
      averageMonthlyBalance: text.match(/Average Monthly Balance:\s*(.*)/)?.[1] || "",
      gstTaxCredit: text.match(/GST\/Tax Credit:\s*(.*)/)?.[1] || "",
      gstTaxDebit: text.match(/GST\/Tax Debit:\s*(.*)/)?.[1] || "",
      chequeBounceNumber: text.match(/Cheque Bounce Number:\s*(.*)/)?.[1] || "",
      emiPaymentsOntime: text.match(/EMI Payments Ontime:\s*(.*)/)?.[1] || "",
      emiPaymentsOverdues: text.match(/EMI Payments Overdues:\s*(.*)/)?.[1] || "",
      largeTransactions: text.match(/Large Transactions:\s*(.*)/)?.[1] || "",
      spendingPattern: text.match(/Spending Pattern:\s*(.*)/)?.[1] || "",
    },
    user: {
      dateOfAccountOpened: text.match(/User Date of Account Opened:\s*(.*)/)?.[1] || "",
      averageMonthlyBalance: text.match(/User Average Monthly Balance:\s*(.*)/)?.[1] || "",
      totalCredits: text.match(/Total Credits:\s*(.*)/)?.[1] || "",
      totalDebits: text.match(/Total Debits:\s*(.*)/)?.[1] || "",
      chequeBounceNumber: text.match(/User Cheque Bounce Number:\s*(.*)/)?.[1] || "",
      transactionFrequency: text.match(/Transaction Frequency:\s*(.*)/)?.[1] || "",
      spendingSavingPattern: text.match(/User Spending\/Saving Pattern:\s*(.*)/)?.[1] || "",
    },
    finalDecision: {
      reasonRequired: text.match(/Reason Required:\s*(.*)/)?.[1] || "",
      finalDecision: text.match(/Final Decision:\s*(.*)/)?.[1] || "",
      authorizedPersonSignature: text.match(/Authorized Person Signature:\s*(.*)/)?.[1] || "",
      digitalOTP: text.match(/Digital OTP:\s*(.*)/)?.[1] || "",
    },
  };
}

// Upload API
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = req.file.path;
  let extractedText = "";

  try {
    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text || "";
    } else if (req.file.mimetype.startsWith("image/")) {
      const ocrResult = await Tesseract.recognize(filePath, "eng");
      extractedText = ocrResult.data.text || "";
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    // Parse extracted text to analysis fields
    const analysis = parseBankText(extractedText);

    const jsonData = {
      rawText: extractedText,
      fileName: req.file.originalname,
      accountNumber: extractedText.match(/Account\s*No:\s*(\d+)/)?.[1] || "N/A",
      uploadedAt: new Date(),
      ...analysis,
    };

    const savedStatement = new BankStatement(jsonData);
    await savedStatement.save();

    fs.unlinkSync(filePath); // cleanup
    res.json({ message: "✅ File processed and saved successfully", data: savedStatement });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process file" });
  }
});

// Fetch latest analysis
app.get("/api/analysis", async (req, res) => {
  try {
    const latest = await BankStatement.findOne().sort({ uploadedAt: -1 });
    if (!latest) return res.status(404).json({ message: "No analysis data found" });
    res.json(latest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch analysis data" });
  }
});

// Fetch all statements (optional)
app.get("/statements", async (req, res) => {
  try {
    const statements = await BankStatement.find().sort({ uploadedAt: -1 });
    res.json(statements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch statements" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
