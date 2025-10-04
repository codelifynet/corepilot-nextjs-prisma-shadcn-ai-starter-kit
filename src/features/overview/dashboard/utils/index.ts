/**
 * Converts bytes to gigabytes with specified decimal places
 * @param bytes - The number of bytes to convert
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted string with GB suffix
 */
export const formatBytesToGB = (bytes: number, decimals: number = 1): string => {
	const gb = bytes / 1024 / 1024 / 1024;
	return `${gb.toFixed(decimals)}GB`;
};

/**
 * Formats memory usage with "used" suffix
 * @param usedBytes - The number of used bytes
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted string with "GB used" suffix
 */
export const formatMemoryUsage = (usedBytes: number, decimals: number = 1): string => {
	return `${formatBytesToGB(usedBytes, decimals)} used`;
};

/**
 * Formats disk usage with "used" suffix
 * @param usedBytes - The number of used bytes
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted string with "GB used" suffix
 */
export const formatDiskUsage = (usedBytes: number, decimals: number = 1): string => {
	return `${formatBytesToGB(usedBytes, decimals)} used`;
};

/**
 * Formats uptime in seconds to hours and minutes
 * @param uptimeSeconds - The uptime in seconds
 * @returns Formatted string in "Xh Ym" format
 */
export const formatUptime = (uptimeSeconds: number): string => {
	const hours = Math.floor(uptimeSeconds / 3600);
	const minutes = Math.floor((uptimeSeconds % 3600) / 60);
	return `${hours}h ${minutes}m`;
};