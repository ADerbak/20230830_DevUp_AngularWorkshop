import {
  E2eTestRunner,
  applicationGenerator
} from '@nx/angular/generators';
import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
  updateProjectConfiguration,
  readProjectConfiguration,
  TargetConfiguration,
  joinPathFragments
} from '@nx/devkit';
import { Linter } from '@nx/linter';
import { moveGenerator } from '@nx/workspace';

import { ToolingGeneratorSchema } from './schema';

const curriculumSets = ['abc', 'rxjs', 'ngrx', 'pwa'];

interface NormalizedSchema extends ToolingGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  hasWorkshop: boolean;
}

function normalizeOptions(
  tree: Tree,
  options: ToolingGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(
    new RegExp('/', 'g'),
    '-'
  );
  const projectRoot = `${
    getWorkspaceLayout(tree).appsDir
  }/${projectDirectory}`;

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    hasWorkshop: options.includeWorkshop ?? false
  };
}

function addFiles(
  tree: Tree,
  options: NormalizedSchema,
  filesFolder: string
) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    tmpl: ''
  };
  generateFiles(
    tree,
    joinPathFragments(__dirname, filesFolder),
    options.projectRoot,
    templateOptions
  );
}

export default async function (
  tree: Tree,
  options: ToolingGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);

  await applicationGenerator(tree, {
    name: normalizedOptions.name,
    prefix: 'app',
    style: 'scss',
    skipTests: true,
    directory: normalizedOptions.directory,
    linter: Linter.EsLint,
    strict: true,
    port: 4300,
    standalone: false,
    e2eTestRunner: E2eTestRunner.Cypress
  });

  const projectConfiguration = readProjectConfiguration(
    tree,
    normalizedOptions.projectName
  );

  // Need to update the assets globbing, stylePreprocessorOptions, and styles
  // in the Build Target's Options
  let buildTarget = projectConfiguration.targets
    ?.build as TargetConfiguration<{
    assets: (
      | string
      | { glob: string; input: string; output: string }
    )[];
    stylePreprocessorOptions: { includePaths: string[] };
    styles: string[];
  }>;

  const matchingCurriculumStep = curriculumSets.find(
    curriculumSet => curriculumSet === normalizedOptions.directory
  );

  if (buildTarget.options) {
    const buildOptions = buildTarget.options;
    buildTarget = {
      ...buildTarget,
      options: {
        ...buildOptions,
        assets: [
          ...buildOptions.assets,
          ...(matchingCurriculumStep
            ? [
                {
                  glob: '**/*',
                  input: `libs/shared/assets/${matchingCurriculumStep}`,
                  output: '/assets/'
                }
              ]
            : []),
          {
            glob: '**/*',
            input: 'libs/shared/assets/shared',
            output: '/assets/'
          }
        ],
        stylePreprocessorOptions: {
          includePaths: [
            ...(matchingCurriculumStep
              ? [`libs/shared/styles/${matchingCurriculumStep}`]
              : []),
            'libs/shared/styles/shared'
          ]
        },
        styles: [
          ...buildOptions.styles,
          ...(matchingCurriculumStep
            ? [
                `libs/shared/styles/${matchingCurriculumStep}/shared.scss`
              ]
            : []),
          'libs/shared/styles/shared/shared.scss'
        ]
      }
    };
  }

  // Need to update the proxyConfig in Serve Target's Options
  let serveTarget = projectConfiguration.targets
    ?.serve as TargetConfiguration<{
    proxyConfig: string;
  }>;

  if (serveTarget.options) {
    const serveOptions = serveTarget.options;
    serveTarget = {
      ...serveTarget,
      options: {
        ...serveOptions,
        proxyConfig: 'proxy.conf.json'
      }
    };
  }

  updateProjectConfiguration(tree, normalizedOptions.projectName, {
    ...projectConfiguration,
    targets: {
      ...projectConfiguration.targets,
      build: buildTarget,
      ['ng-serve']: serveTarget,
      serve: {
        executor: 'nx:run-commands',
        options: {
          commands: [
            'npx nx serve server',
            `npx nx ng-serve ${normalizedOptions.projectName} --output-style=stream-without-prefixes`
          ]
        }
      }
    }
  });

  addFiles(tree, normalizedOptions, 'files');
  if (normalizedOptions.includeWorkshop) {
    addFiles(tree, normalizedOptions, 'workshop-files');
  }

  const nxSplashScreenComponentPath = joinPathFragments(
    normalizedOptions.projectRoot,
    'src',
    'app',
    'nx-welcome.component.ts'
  );
  if (tree.isFile(nxSplashScreenComponentPath)) {
    tree.delete(nxSplashScreenComponentPath);
  }

  await moveGenerator(tree, {
    projectName: `${normalizedOptions.projectName}-e2e`,
    destination: `${normalizedOptions.projectDirectory}/cypress`,
    updateImportPath: true
  });

  const cypressConfiguration = readProjectConfiguration(
    tree,
    `${normalizedOptions.projectName}-cypress`
  );

  updateProjectConfiguration(
    tree,
    `${normalizedOptions.projectName}-cypress`,
    {
      ...cypressConfiguration,
      name: `${normalizedOptions.projectName}-e2e`
    }
  );

  await formatFiles(tree);
}
