import Git from 'nodegit'
import { Reference, Object as GitObject } from 'nodegit'

export interface GitContext {
  branch: string
  commit: string
  committer: string
  message: string
  remoteUrl: string
}

export class GitContext implements GitContext {
  constructor(override?: GitContext) {
    Object.assign(this, override)
  }

  async init() {
    const path = await Git.Repository.discover('.', 0, '')
    const repo = await Git.Repository.open(path)
    const head = await repo.head()
    const cid = (await head.peel(GitObject.TYPE.COMMIT)).id()
    const commit = await repo.getCommit(cid)
    const author = await commit.author()
    const remote = await repo.getRemote('origin')

    this.branch = this.branch || head.name()
    this.commit = this.commit || cid.toString()
    this.committer = this.committer || author.toString()
    this.remoteUrl = this.remoteUrl || remote.url()
  }
}
