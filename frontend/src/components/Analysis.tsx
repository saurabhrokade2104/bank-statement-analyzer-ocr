import React, { useEffect, useState } from "react";
import axios from "axios";

const AnalysisPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("salaried");
  const [analysisData, setAnalysisData] = useState<any>({
    salaried: {},
    salariedRisk: {},
    business: {},
    user: {},
    finalDecision: {},
  });

  const [availableTabs, setAvailableTabs] = useState<string[]>([]);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const res = await axios.get("http://65.1.184.12:4000/analysis");
        if (res.data) {
          setAnalysisData(res.data);

          const rawText = res.data.rawText?.toLowerCase() || "";
          const tabs: string[] = [];
          if (rawText.includes("salaried")) tabs.push("salaried");
          if (rawText.includes("business")) tabs.push("business");
          if (rawText.includes("user")) tabs.push("user");

          setAvailableTabs(tabs);
          if (tabs.length > 0) setActiveTab(tabs[0]);
        }
      } catch (err) {
        console.error("Failed to fetch analysis data:", err);
      }
    };

    fetchAnalysisData();
  }, []);

  const renderInputs = (data: any, labels: string[], keys: string[]) => {
    return keys.map((key, idx) => (
      <div key={key}>
        <label className="block text-sm text-gray-600">{labels[idx]}</label>
        <input
          type="text"
          value={data?.[key] || ""}
          onChange={(e) => {
            data[key] = e.target.value;
            setAnalysisData({ ...analysisData });
          }}
          className="w-full border rounded-lg px-2 py-1"
        />
      </div>
    ));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b pb-2">
        {availableTabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Salaried */}
      {activeTab === "salaried" && (
        <>
          <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Applicant Bank Statement Detailed Analysis - Salaried
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {renderInputs(
                analysisData.salaried,
                [
                  "Date of Account Opened",
                  "Salary Credited Date",
                  "Average Monthly Balance",
                  "Ontime EMI Payments",
                  "Overdue EMI Payments",
                  "Cheque Bounce Number",
                  "Salary Match",
                  "Spending/Savings Patterns",
                ],
                [
                  "dateOfAccountOpened",
                  "salaryCreditedDate",
                  "averageMonthlyBalance",
                  "ontimeEMIPayments",
                  "overdueEMIPayments",
                  "chequeBounceNumber",
                  "salaryMatch",
                  "spendingSavingsPatterns",
                ]
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button className="px-6 py-2 bg-white border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                View
              </button>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Download
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Applicant Risk Factors - Salaried
              </h2>
              <button className="px-3 py-1 text-sm bg-white border text-black rounded-lg hover:bg-yellow-600 transition">
                Edit
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {renderInputs(
                analysisData.salariedRisk,
                [
                  "Personal Behavioral Status",
                  "Personal Risk Status (Legal)",
                  "Job Stability",
                  "Credit Score Stability",
                  "Income Stability",
                  "Present Obligations",
                  "Payment Repayment Ability",
                  "Residential Area Risk",
                  "Final Decision for Credit",
                ],
                [
                  "personalBehavioralStatus",
                  "personalRiskStatusLegal",
                  "jobStability",
                  "creditScoreStability",
                  "incomeStability",
                  "presentObligations",
                  "paymentRepaymentAbility",
                  "residentialAreaRisk",
                  "finalDecisionForCredit",
                ]
              )}
            </div>
          </div>
        </>
      )}

      {/* Business */}
      {activeTab === "business" && (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Applicant Business Bank Statement Detailed Analysis
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {renderInputs(
              analysisData.business,
              [
                "Date of Account Pull",
                "Credit Entry",
                "Debit Entry",
                "Average Monthly Balance",
                "GST/Tax Credit",
                "GST/Tax Debit",
                "Cheque Bounce Number",
                "EMI Payments Ontime",
                "EMI Payments Overdues",
                "Large Transactions",
                "Spending Pattern",
              ],
              [
                "dateOfAccountPull",
                "creditEntry",
                "debitEntry",
                "averageMonthlyBalance",
                "gstTaxCredit",
                "gstTaxDebit",
                "chequeBounceNumber",
                "emiPaymentsOntime",
                "emiPaymentsOverdues",
                "largeTransactions",
                "spendingPattern",
              ]
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button className="px-6 py-2 bg-white border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              View
            </button>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Download
            </button>
          </div>
        </div>
      )}

      {/* User */}
      {activeTab === "user" && (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Applicant User Bank Statement Analysis
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {renderInputs(
              analysisData.user,
              [
                "Date of Account Opened",
                "Average Monthly Balance",
                "Total Credits",
                "Total Debits",
                "Cheque Bounce Number",
                "Transaction Frequency",
                "Spending/Saving Pattern",
              ],
              [
                "dateOfAccountOpened",
                "averageMonthlyBalance",
                "totalCredits",
                "totalDebits",
                "chequeBounceNumber",
                "transactionFrequency",
                "spendingSavingPattern",
              ]
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button className="px-6 py-2 bg-white border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              View
            </button>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Download
            </button>
          </div>
        </div>
      )}

      {/* Final Decision */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-medium text-blue-600 text-center mb-6">
          Final Decision (Official Use Only)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-xs text-gray-600 mb-2">
              Reason (Required)
            </label>
            <select
              value={analysisData.finalDecision.reasonRequired || ""}
              onChange={(e) => {
                analysisData.finalDecision.reasonRequired = e.target.value;
                setAnalysisData({ ...analysisData });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="">Enter Reason</option>
              <option value="Good Credit Score">Good Credit Score</option>
              <option value="Stable Income">Stable Income</option>
              <option value="High Risk">High Risk</option>
              <option value="Insufficient Documents">Insufficient Documents</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-2">
              Final Decision
            </label>
            <select
              value={analysisData.finalDecision.finalDecision || ""}
              onChange={(e) => {
                analysisData.finalDecision.finalDecision = e.target.value;
                setAnalysisData({ ...analysisData });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="">Select</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-2">
              Authorized Person Signature
            </label>
            <select
              value={analysisData.finalDecision.authorizedPersonSignature || ""}
              onChange={(e) => {
                analysisData.finalDecision.authorizedPersonSignature = e.target.value;
                setAnalysisData({ ...analysisData });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="">Digital Signature for Decision</option>
              <option value="Manager Signature">Manager Signature</option>
              <option value="Senior Officer Signature">Senior Officer Signature</option>
              <option value="Branch Head Signature">Branch Head Signature</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-2">
              Digital OTP
            </label>
            <input
              type="text"
              value={analysisData.finalDecision.digitalOTP || ""}
              onChange={(e) => {
                analysisData.finalDecision.digitalOTP = e.target.value;
                setAnalysisData({ ...analysisData });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="Enter Valid OTP"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors">
            Update Decision
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
