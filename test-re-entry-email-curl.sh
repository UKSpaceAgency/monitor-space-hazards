#!/bin/bash

echo "Testing re-entry closedown email endpoint..."
echo "Endpoint: POST /api/email/re-entry-closed"

# Test data
cat > test-data.json << 'EOF'
{
  "event": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "shortId": "RE-2024-001",
    "objectName": "Falcon 9 Second Stage",
    "objectType": "Rocket Body",
    "estimatedMass": 4000,
    "decayEpoch": "2024-01-20T10:00:00Z",
    "uncertaintyWindow": 120,
    "overflightTime": ["2024-01-20T09:30:00Z", "2024-01-20T10:30:00Z"],
    "monteCarloRisk": "High",
    "monteCarloProbability": 0.85,
    "licensedCountry": "United States",
    "pressAttention": "This event has received significant media attention due to its high risk profile.",
    "reentryReportNumber": 1
  },
  "report": {
    "id": "456e7890-e89b-12d3-a456-426614174001",
    "createdAt": "2024-01-15T11:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z",
    "alertType": "closedown",
    "presignedUrl": "https://example.com/report.pdf",
    "impact": {
      "by_nation": {
        "england_nation": { "probability": 0.6, "overflight_time": ["2024-01-20T09:30:00Z"] },
        "scotland_nation": { "probability": 0.3, "overflight_time": ["2024-01-20T09:45:00Z"] },
        "wales_nation": { "probability": 0.2, "overflight_time": ["2024-01-20T10:00:00Z"] }
      },
      "overseas_territories_and_crown_dependencies": {
        "gibraltar": { "probability": 0.05, "overflight_time": ["2024-01-20T08:30:00Z"] }
      },
      "maritime_and_airspace": {
        "south_georgia_and_the_south_sandwich_islands": { "probability": 0.8, "overflight_time": ["2024-01-20T09:20:00Z"] },
        "turks_and_caicos_islands": { "probability": 0.6, "overflight_time": ["2024-01-20T09:25:00Z"] }
      }
    }
  }
}
EOF

echo "Request data:"
cat test-data.json

echo -e "\nSending request..."

# Make the curl request
response=$(curl -s -w "\n%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -d @test-data.json \
  http://localhost:3000/api/email/re-entry-closed)

# Extract status code and response body
http_code=$(echo "$response" | tail -n1)
response_body=$(echo "$response" | head -n -1)

echo -e "\nResponse status: $http_code"

if [ "$http_code" -eq 200 ]; then
    echo "✅ Success! Email HTML generated."
    echo "Response preview (first 500 chars):"
    echo "$response_body" | head -c 500
    echo "..."
    
    # Save the HTML response to a file
    echo "$response_body" | jq -r '.html' > test-email-output.html
    echo "📄 HTML saved to test-email-output.html"
else
    echo "❌ Error response:"
    echo "$response_body"
fi

# Clean up
rm test-data.json 