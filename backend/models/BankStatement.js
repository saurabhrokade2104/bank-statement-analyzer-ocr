const mongoose = require("mongoose");

const BankStatementSchema = new mongoose.Schema({
  fileName: String,
  rawText: String,
  accountNumber: String,
  uploadedAt: { type: Date, default: Date.now },

  salaried: {
    dateOfAccountOpened: String,
    salaryCreditedDate: String,
    averageMonthlyBalance: String,
    ontimeEMIPayments: String,
    overdueEMIPayments: String,
    chequeBounceNumber: String,
    salaryMatch: String,
    spendingSavingsPatterns: String,
  },

  salariedRisk: {
    personalBehavioralStatus: String,
    personalRiskStatusLegal: String,
    jobStability: String,
    creditScoreStability: String,
    incomeStability: String,
    presentObligations: String,
    paymentRepaymentAbility: String,
    residentialAreaRisk: String,
    finalDecisionForCredit: String,
  },

  business: {
    dateOfAccountPull: String,
    creditEntry: String,
    debitEntry: String,
    averageMonthlyBalance: String,
    gstTaxCredit: String,
    gstTaxDebit: String,
    chequeBounceNumber: String,
    emiPaymentsOntime: String,
    emiPaymentsOverdues: String,
    largeTransactions: String,
    spendingPattern: String,
  },

  user: {
    dateOfAccountOpened: String,
    averageMonthlyBalance: String,
    totalCredits: String,
    totalDebits: String,
    chequeBounceNumber: String,
    transactionFrequency: String,
    spendingSavingPattern: String,
  },

  finalDecision: {
    reasonRequired: String,
    finalDecision: String,
    authorizedPersonSignature: String,
    digitalOTP: String,
  },
});

module.exports = mongoose.model("BankStatement", BankStatementSchema);
