import type { AuthFormProps } from "../types";

export default function AuthForm({
	title,
	fields,
	onSubmit,
	submitText,
	disabled,
	error,
	values,
	onChange,
}: AuthFormProps) {
	return (
		<form
			className="flex flex-col gap-3 mb-4 dark:bg-gray-800 dark:text-white p-4 rounded-lg"
			onSubmit={onSubmit}
			autoComplete="off"
		>
			<h3>{title}</h3>
			{fields?.map((field) => (
				<input
					key={field.name}
					type={field.type}
					name={field.name}
					placeholder={field.placeholder}
					value={values?.[field.name] ?? ""}
					onChange={(e) => onChange?.(field.name, e.target.value)}
					required={field.required}
					className="p-2 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400"
				/>
			))}
			<button
				type="submit"
				disabled={disabled}
				className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
			>
				{submitText}
			</button>
			{error && (
				<div className="text-red-500 dark:text-red-400 text-sm">{error}</div>
			)}
		</form>
	);
}
