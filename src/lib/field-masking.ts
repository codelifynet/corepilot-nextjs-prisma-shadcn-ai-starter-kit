// Field-Level Masking Helper
// Provides secure data masking functionality for RBAC field-level authorization

import { MASK_TYPES, type MaskType } from "@/constants/permissions";

/**
 * Configuration for different masking strategies
 */
interface MaskingConfig {
	partialShowLength?: number; // Number of characters to show for partial masking
	partialMaskChar?: string; // Character to use for masking
	emailDomainVisible?: boolean; // Whether to show domain in email masking
	phoneCountryVisible?: boolean; // Whether to show country code in phone masking
}

/**
 * Default masking configuration
 */
const DEFAULT_CONFIG: Required<MaskingConfig> = {
	partialShowLength: 4,
	partialMaskChar: "*",
	emailDomainVisible: true,
	phoneCountryVisible: true,
};

/**
 * Apply masking to a field value based on mask type
 * @param value - The original value to mask
 * @param maskType - Type of masking to apply
 * @param fieldType - Type of field (for specialized masking)
 * @param config - Optional masking configuration
 * @returns Masked value
 */
export function applyMask(
	value: unknown,
	maskType: MaskType | null | undefined,
	fieldType?:
		| "email"
		| "phone"
		| "credit_card"
		| "ssn"
		| "address"
		| "name"
		| "amount",
	config: MaskingConfig = {},
): string {
	// Handle null/undefined values
	if (value === null || value === undefined) {
		return "";
	}

	const stringValue = String(value);
	const finalConfig = { ...DEFAULT_CONFIG, ...config };

	// No masking required
	if (!maskType || maskType === MASK_TYPES.NONE) {
		return stringValue;
	}

	// Complete hiding
	if (maskType === MASK_TYPES.HIDDEN) {
		return generateMaskString(stringValue.length, finalConfig.partialMaskChar);
	}

	// Redacted format
	if (maskType === MASK_TYPES.REDACTED) {
		return "[REDACTED]";
	}

	// Encrypted format (simulated)
	if (maskType === MASK_TYPES.ENCRYPTED) {
		return `[ENCRYPTED:${generateHash(stringValue)}]`;
	}

	// Partial masking with field-specific logic
	if (maskType === MASK_TYPES.PARTIAL) {
		return applyPartialMask(stringValue, fieldType, finalConfig);
	}

	// Fallback to original value
	return stringValue;
}

/**
 * Apply partial masking with field-specific strategies
 */
function applyPartialMask(
	value: string,
	fieldType?: string,
	config: Required<MaskingConfig> = DEFAULT_CONFIG,
): string {
	if (!value || value.length === 0) {
		return value;
	}

	switch (fieldType) {
		case "email":
			return maskEmail(value, config);
		case "phone":
			return maskPhone(value, config);
		case "credit_card":
			return maskCreditCard(value, config);
		case "ssn":
			return maskSSN(value, config);
		case "address":
			return maskAddress(value, config);
		case "name":
			return maskName(value, config);
		case "amount":
			return maskAmount(value, config);
		default:
			return maskGeneric(value, config);
	}
}

/**
 * Mask email addresses
 * Example: john.doe@example.com -> j***@example.com or j***@***
 */
function maskEmail(email: string, config: Required<MaskingConfig>): string {
	const emailRegex = /^([^@]+)@(.+)$/;
	const match = email.match(emailRegex);

	if (!match) {
		return maskGeneric(email, config);
	}

	const [, localPart, domain] = match;
	const maskedLocal =
		localPart.length > 1
			? localPart[0] +
				generateMaskString(localPart.length - 1, config.partialMaskChar)
			: config.partialMaskChar;

	if (config.emailDomainVisible) {
		return `${maskedLocal}@${domain}`;
	} else {
		const maskedDomain = generateMaskString(
			domain.length,
			config.partialMaskChar,
		);
		return `${maskedLocal}@${maskedDomain}`;
	}
}

/**
 * Mask phone numbers
 * Example: +1-555-123-4567 -> +1-***-***-4567 or ***-***-4567
 */
function maskPhone(phone: string, config: Required<MaskingConfig>): string {
	// Remove all non-digit characters for processing
	const digitsOnly = phone.replace(/\D/g, "");

	if (digitsOnly.length < 4) {
		return generateMaskString(phone.length, config.partialMaskChar);
	}

	// Show last 4 digits
	const lastFour = digitsOnly.slice(-4);
	const maskedPart = generateMaskString(
		digitsOnly.length - 4,
		config.partialMaskChar,
	);

	// Apply masking
	let result = maskedPart + lastFour;

	// If original had country code and we want to show it
	if (config.phoneCountryVisible && phone.startsWith("+")) {
		const countryCodeMatch = phone.match(/^(\+\d{1,3})[^\d]/);
		if (countryCodeMatch) {
			const countryCode = countryCodeMatch[1];
			const remainingMask = generateMaskString(
				digitsOnly.length - countryCode.slice(1).length - 4,
				config.partialMaskChar,
			);
			result = `${countryCode}-${remainingMask}-${lastFour}`;
		}
	}

	return result;
}

/**
 * Mask credit card numbers
 * Example: 4532-1234-5678-9012 -> ****-****-****-9012
 */
function maskCreditCard(
	cardNumber: string,
	config: Required<MaskingConfig>,
): string {
	const digitsOnly = cardNumber.replace(/\D/g, "");

	if (digitsOnly.length < 4) {
		return generateMaskString(cardNumber.length, config.partialMaskChar);
	}

	const lastFour = digitsOnly.slice(-4);
	const maskedPart = generateMaskString(
		digitsOnly.length - 4,
		config.partialMaskChar,
	);

	// Preserve original formatting if possible
	if (cardNumber.includes("-")) {
		const groups = Math.ceil((digitsOnly.length - 4) / 4);
		const maskGroups = Array(groups).fill("****").join("-");
		return `${maskGroups}-${lastFour}`;
	}

	return maskedPart + lastFour;
}

/**
 * Mask Social Security Numbers
 * Example: 123-45-6789 -> ***-**-6789
 */
function maskSSN(ssn: string, config: Required<MaskingConfig>): string {
	const digitsOnly = ssn.replace(/\D/g, "");

	if (digitsOnly.length !== 9) {
		return generateMaskString(ssn.length, config.partialMaskChar);
	}

	const lastFour = digitsOnly.slice(-4);
	return `***-**-${lastFour}`;
}

/**
 * Mask addresses
 * Example: "123 Main Street, Apt 4B" -> "*** Main Street, ***"
 */
function maskAddress(address: string, config: Required<MaskingConfig>): string {
	// Mask numbers and apartment/unit information
	return address
		.replace(/\d+/g, generateMaskString(3, config.partialMaskChar))
		.replace(
			/\b(apt|apartment|unit|suite|ste)\s+\w+/gi,
			`$1 ${generateMaskString(3, config.partialMaskChar)}`,
		);
}

/**
 * Mask names
 * Example: "John Michael Doe" -> "J*** M*** D***"
 */
function maskName(name: string, config: Required<MaskingConfig>): string {
	return name
		.split(" ")
		.map((part) => {
			if (part.length <= 1) return part;
			return (
				part[0] + generateMaskString(part.length - 1, config.partialMaskChar)
			);
		})
		.join(" ");
}

/**
 * Mask monetary amounts
 * Example: "$1,234.56" -> "$*,***.56" or "$***"
 */
function maskAmount(amount: string, config: Required<MaskingConfig>): string {
	// Extract currency symbol and decimal part
	const currencyMatch = amount.match(/^([^\d]*)/); // Currency symbols at start
	const decimalMatch = amount.match(/(\.[\d]{1,2})$/); // Decimal part at end

	const currency = currencyMatch ? currencyMatch[1] : "";
	const decimal = decimalMatch ? decimalMatch[1] : "";

	// Mask the main amount but keep currency and cents
	const mainPart = amount.replace(/^[^\d]*/, "").replace(/\.[\d]{1,2}$/, "");
	const maskedMain = generateMaskString(
		mainPart.length,
		config.partialMaskChar,
	);

	return currency + maskedMain + decimal;
}

/**
 * Generic partial masking
 * Shows first few characters and masks the rest
 */
function maskGeneric(value: string, config: Required<MaskingConfig>): string {
	if (value.length <= config.partialShowLength) {
		return generateMaskString(value.length, config.partialMaskChar);
	}

	const visiblePart = value.slice(0, config.partialShowLength);
	const maskedPart = generateMaskString(
		value.length - config.partialShowLength,
		config.partialMaskChar,
	);

	return visiblePart + maskedPart;
}

/**
 * Generate a string of mask characters
 */
function generateMaskString(length: number, maskChar: string = "*"): string {
	return Array(Math.max(0, length)).fill(maskChar).join("");
}

/**
 * Generate a simple hash for encrypted display
 */
function generateHash(value: string): string {
	let hash = 0;
	for (let i = 0; i < value.length; i++) {
		const char = value.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32-bit integer
	}
	return Math.abs(hash).toString(16).toUpperCase().padStart(8, "0");
}

/**
 * Apply masking to an entire object based on field permissions
 * @param data - Object to mask
 * @param fieldPermissions - Map of field names to mask types
 * @param config - Masking configuration
 * @returns Masked object
 */
export function applyObjectMasking<T extends Record<string, unknown>>(
	data: T,
	fieldPermissions: Record<
		string,
		{ maskType: MaskType | null; fieldType?: string }
	>,
	config: MaskingConfig = {},
): T {
	const result = { ...data };

	for (const [fieldName, permission] of Object.entries(fieldPermissions)) {
		if (fieldName in result) {
			(result as Record<string, unknown>)[fieldName] = applyMask(
				result[fieldName],
				permission.maskType,
				permission.fieldType as
					| "email"
					| "phone"
					| "credit_card"
					| "ssn"
					| "address"
					| "name"
					| "amount",
				config,
			);
		}
	}

	return result;
}

/**
 * Apply masking to an array of objects
 * @param dataArray - Array of objects to mask
 * @param fieldPermissions - Map of field names to mask types
 * @param config - Masking configuration
 * @returns Array of masked objects
 */
export function applyArrayMasking<T extends Record<string, unknown>>(
	dataArray: T[],
	fieldPermissions: Record<
		string,
		{ maskType: MaskType | null; fieldType?: string }
	>,
	config: MaskingConfig = {},
): T[] {
	return dataArray.map((item) =>
		applyObjectMasking(item, fieldPermissions, config),
	);
}

/**
 * Check if a field should be completely hidden (not just masked)
 * @param maskType - The mask type to check
 * @returns True if field should be hidden from response
 */
export function shouldHideField(
	maskType: MaskType | null | undefined,
): boolean {
	return maskType === MASK_TYPES.HIDDEN || maskType === MASK_TYPES.REDACTED;
}

/**
 * Remove hidden fields from an object
 * @param data - Object to filter
 * @param fieldPermissions - Map of field names to mask types
 * @returns Object with hidden fields removed
 */
export function removeHiddenFields<T extends Record<string, unknown>>(
	data: T,
	fieldPermissions: Record<string, { maskType: MaskType | null }>,
): Partial<T> {
	const result = { ...data };

	for (const [fieldName, permission] of Object.entries(fieldPermissions)) {
		if (shouldHideField(permission.maskType)) {
			delete result[fieldName];
		}
	}

	return result;
}
