import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		ignores: ["src/generated/**/*"],
	},
	{
		rules: {
			// TypeScript - Critical errors that should be fixed
			"@typescript-eslint/no-unused-vars": "error",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/prefer-as-const": "error",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-inferrable-types": "off",
			"@typescript-eslint/consistent-type-imports": "off",

			// React - Important rules for component development
			"react/no-unescaped-entities": "off",
			"react/jsx-key": "error",
			"react/jsx-no-duplicate-props": "error",
			"react/jsx-no-undef": "error",
			"react/no-children-prop": "off",
			"react/no-danger-with-children": "error",
			"react/no-deprecated": "off",
			"react/no-direct-mutation-state": "error",
			"react/no-find-dom-node": "warn",
			"react/no-render-return-value": "error",
			"react/require-render-return": "error",

			// General JavaScript/ES6 - Basic code quality
			"no-console": "off",
			"no-debugger": "error",
			"no-alert": "off",
			"no-duplicate-imports": "off", // Allow React default + named imports
			"no-unreachable": "error",
			"no-unused-expressions": "off",

			"prefer-const": "off",
			"no-var": "error",
			eqeqeq: "off",

			// Next.js specific - Critical for performance and SEO
			"@next/next/no-html-link-for-pages": "error",
			"@next/next/no-img-element": "warn",
			"@next/next/no-page-custom-font": "warn",
		},
	},
];

export default eslintConfig;
