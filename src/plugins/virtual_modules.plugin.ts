function virtualModules(enabledModules?: string) {
	const modules = enabledModules 
		? enabledModules.split(',').map(m => m.trim()).filter(Boolean)
		: [];
	
	console.log(' Virtual Modules Plugin - modules:', modules);
	
	return {
		name: "virtual-modules",
		resolveId(id: string) {
			if (id === "virtual:plugins") {
				return id;
			}
			return null;
		},
		load(id: string) {
			if (id === "virtual:plugins") {
				console.log('📦 Loading virtual:plugins with modules:', modules);
				
				const imports = modules
					.map((m: string) => `import '/src/modules/${m}.ts';`)
					.join("\n");
					
				console.log('📝 Generated imports:', imports);
				
				return imports;
			}
			return null;
		},
	};
}

export default virtualModules;
