import svelte from 'eslint-plugin-svelte';
import tseslint from 'typescript-eslint';
import oxlint from 'eslint-plugin-oxlint';
import globals from 'globals';

// Scoped to *.svelte only (see the "lint:svelte" npm script) — oxlint already
// covers plain .ts/.js files, so this config only needs to handle Svelte's
// <script> blocks and markup-specific rules.
export default tseslint.config(
	...tseslint.configs.recommended,
	...svelte.configs.recommended,
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			},
			globals: { ...globals.browser }
		},
		rules: {
			// Disables the check requiring hrefs to go through SvelteKit's
			// resolve() helper for type-checked route paths.
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	// Turns off any rule here that oxlint already reports, so the two don't
	// produce duplicate/conflicting diagnostics on Svelte's <script> content.
	...oxlint.configs['flat/recommended'],
	{
		ignores: ['.svelte-kit/', 'build/', 'dist/']
	}
);
