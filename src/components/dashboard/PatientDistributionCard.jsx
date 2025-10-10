// src/components/PatientDistributionCard.jsx
import React from "react";
import { Paper, Typography, Box, Stack } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Chart data
const data = [
  { name: "OCD", value: 35, color: "#DB89DA" },
  { name: "Bipolar", value: 35, color: "#F2CE82" },
  { name: "Depression", value: 30, color: "#1488DB" }
];

export default function PatientDistributionCard() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "16px",
        boxShadow: "0px 0.5px 9px 0px rgba(111, 111, 111, 0.3)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Albert Sans, sans-serif"
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ fontWeight: 600, fontSize: "20px", color: "#333" }}
      >
        Patient Distribution
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexGrow: 1, mt: 2 }}>
        {/* Donut Chart */}
        <Box sx={{ width: "50%", height: 200, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={80}
                outerRadius={90}
                paddingAngle={-5}
                dataKey="value"
                cornerRadius={10}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
            <Typography sx={{ fontWeight: 422, fontSize: "25px", color: "#333", lineHeight: 1 }}>100</Typography>
            <Typography sx={{ fontWeight: 500, fontSize: "25px", color: "#333" }}>Patients</Typography>
          </Box>
        </Box>

        {/* Legend */}
        <Stack spacing={2} sx={{ width: "35%", pl: 1 }}>
          {data.map((item, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: item.color, mr: 1, flexShrink: 1 }} />
              <Typography sx={{ fontWeight: 500, fontSize: "16px", color: item.color }}>{item.name}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
