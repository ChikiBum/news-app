// declare module "virtual:plugins";

const modules: string[] = [
'userStore',
'authStore',
'loginSchema',
'mockApi'
]; 

function virtualModules() {
  return {
    name: 'virtual-modules',
    resolveId(id: string) {
      if (id === 'virtual:plugins') {
        return id;
      }
      return null;
    },
    load(id: string) {
      if (id === 'virtual:plugins') {
        return modules.map((m: string) => `import './src/modules/${m}.ts';`).join('\n');
      }
      return null;
    },
  };
}

export default virtualModules;