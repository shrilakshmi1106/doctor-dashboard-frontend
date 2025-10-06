import React, { useState, useEffect } from "react";

export default function NewReportsCard() {
  const [metricsData, setMetricsData] = useState({
    count: 0,
    description: "new pending reports",
    isLoading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/reports/pending");
        const data = await response.json();

        setMetricsData({
          count: data.count || 5,
          description: "new pending reports",
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setMetricsData({
          count: 5,
          description: "new pending reports",
          isLoading: false,
        });
      }
    };

    fetchData();
  }, []);

  const cardStyles = {
    background: "linear-gradient(135deg, #ffffff 60%, rgba(219, 234, 254, 0.5) 100%)",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    padding: "24px",
    fontFamily: "Albert Sans, sans-serif",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  if (metricsData.isLoading) {
    return (
      <div style={{ width: "100%", fontFamily: "Albert Sans, sans-serif" }}>
        <div style={cardStyles}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", fontFamily: "Albert Sans, sans-serif" }}>
      <div style={cardStyles}>
        <div>
          <h3
            style={{
              color: "#374151",
              fontSize: "20px",
              fontWeight: "400",
              margin: "0 0 12px 0",
            }}
          >
            New Reports
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "400",
                color: "#1f2937",
                lineHeight: "1",
              }}
            >
              {metricsData.count}
            </span>
            <span style={{ fontSize: "20px", color: "#6b7280", fontWeight: "400" }}>
              {metricsData.description}
            </span>
          </div>
        </div>

        <button
          style={{
            width: "100%",
            backgroundColor: "#3b82f6",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
            padding: "12px",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#2563eb"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#3b82f6"}
        >
          Check Reports
        </button>
      </div>
    </div>
  );
}