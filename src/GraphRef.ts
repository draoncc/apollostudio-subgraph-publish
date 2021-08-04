export class GraphRef {
  name: string
  variant: string

  constructor(graph: string) {
    const split = graph.split('@')
    this.name = split[0]
    this.variant = split[1]
  }
}
