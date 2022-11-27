// @ts-check
import { execaSync } from 'execa';

const { stdout } = gitOperation(['log', '-n', '1']);

if (!stdout.includes('chore(release): publish')) {
  throw new Error('Latest commit is not a release commit');
}

const releaseTagRegex = /[A-Za-z].*@.*/g;

const tagsFound = stdout.match(releaseTagRegex);

tagsFound.splice(0, 1);

for (const tag of tagsFound) {
  console.log(`Processing tag: ${tag}`);

  console.log(`Deleting ${tag} from local branch.`);
  gitOperation(['tag', '-d', tag]);
  console.log(`Deleting ${tag} from remote.`);
  gitOperation(['push', '--delete', 'origin', tag]);
  console.log(`Tagging master branch`);
  gitOperation(['tag', tag, '-m', `'${tag}'`]);
  console.log(`Pushing tags to master`);
  gitOperation(['push', '--tags']);
}

/**
 * @param {string[]} params
 *
 * @returns { {stdout: string}}
 * */
function gitOperation(params) {
  const { stdout } = execaSync('git', params);

  console.log(stdout);

  return { stdout };
}

