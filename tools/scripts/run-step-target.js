const target = process.argv[2];

let name = process.argv[3];
const rest = [...process.argv.slice(4)];
if (rest.length > 0) {
  rest.unshift('--');
}

if (!target || !name) {
  console.error('Must supply target and project name');
}

const {
  readWorkspaceConfig
} = require('../../node_modules/nx/src/project-graph/file-utils');

const workspaceConfig = readWorkspaceConfig({
  format: 'nx'
});

const startsWithDigit = /^\d/;
if (startsWithDigit.test(name)) {
  name = 'abc-' + name; // Default prefix = 'abc-'
}

const projectNames = Object.keys(workspaceConfig.projects).filter(
  project =>
    workspaceConfig.projects[project].projectType === 'application'
);

let suffixFilter = name => !name.endsWith('-e2e');

if (target == 'e2e') {
  suffixFilter = name => name.endsWith('-e2e');
}

const matchingNames = projectNames.filter(
  projectName =>
    (name === projectName || projectName.startsWith(name + '-')) &&
    suffixFilter(projectName)
);

if (matchingNames.length === 1) {
  const cmd = ['npx', 'nx', target, matchingNames[0], ...rest].join(
    ' '
  );
  console.log('Running: ', cmd);
  const { execSync } = require('child_process');
  execSync(cmd, { stdio: 'inherit' });
} else if (matchingNames.length > 1) {
  console.log('Too many projects matches. please be more specific!');
  console.table(matchingNames);
  process.exit(1);
} else {
  console.error('cannot find', name);
  process.exit(1);
}
