/**
 * Extracts the highest risk value from event.highest_impact.data
 * @param highestImpact - The highest impact data object
 * @returns The highest risk value or null if none exist
 */
export function getHighestRisk(highestImpact: any) {
  // Check if highest_impact exists and has data
  if (!highestImpact || !highestImpact.data) {
    return null;
  }

  const { atmospheric_risk, fragments_risk, human_casualty_risk } = highestImpact.data;

  // Return the highest non-null risk value
  const risks = [atmospheric_risk, fragments_risk, human_casualty_risk].filter(risk => risk !== null);

  if (risks.length === 0) {
    return null;
  }

  // Return the maximum risk value
  return Math.max(...risks);
}
