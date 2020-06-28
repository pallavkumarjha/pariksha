  export interface workflow {
    nodes: nodes[];
    isComplete: boolean;
    name: string;
    stage: string;
  }

  export interface nodes {
    name: string;
    content: string;
    state: string;
  }
  
  