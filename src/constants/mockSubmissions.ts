import { Submission } from '@/types/submission'

export const mockSubmissions: Submission[] = [
    {
      id: 1,
      challenge: {
        title: "Quantum Computing Challenge: Optimization Problems",
        description: "Develop a quantum algorithm to solve the traveling salesman problem more efficiently than classical approaches. This challenge focuses on implementing quantum circuits using Qiskit or Cirq, with emphasis on NISQ-era constraints."
      },
      details: `I've implemented a hybrid quantum-classical algorithm using Qiskit that demonstrates a 30% improvement in solving the Traveling Salesman Problem for 10-city cases. Key features include:
  
  - Novel quantum circuit design with reduced gate depth
  - Efficient parameter optimization using classical gradient descent
  - Implementation of error mitigation techniques
  - Comprehensive benchmarking against classical solutions`,
      submittedAt: "2024-01-04T15:30:00Z",
      media: [
        {
          type: "video",
          url: "/quantum-demo.mp4",
          description: "Algorithm demonstration and performance comparison",
          filename: "quantum-demo.mp4"
        },
        {
          type: "document",
          url: "/technical-report.pdf",
          filename: "Technical_Report.pdf",
          description: "Detailed implementation analysis and benchmarking results"
        },
        {
          type: "link",
          url: "https://github.com/example/quantum-tsp",
          title: "GitHub Repository",
          description: "Source code and documentation"
        }
      ]
    },
    {
      id: 2,
      challenge: {
        title: "AI Model Deployment Challenge",
        description: "Design and implement a scalable MLOps pipeline for deploying large language models in production. Focus on monitoring, A/B testing, and handling model drift in real-world scenarios."
      },
      details: `Created a robust MLOps pipeline for LLM deployment with the following components:
  
  - Kubernetes-based deployment architecture with auto-scaling
  - Real-time monitoring system using Prometheus and Grafana
  - Automated A/B testing framework with statistical significance testing
  - Model drift detection using KL divergence metrics
  - Streamlined CI/CD pipeline with automated testing`,
      submittedAt: "2024-01-05T09:45:00Z",
      media: [
        {
          type: "image",
          url: "/architecture-diagram.png",
          description: "System architecture and workflow diagram",
          filename: "architecture.png"
        },
        {
          type: "document",
          url: "/deployment-guide.pdf",
          filename: "Deployment_Guide.pdf",
          description: "Step-by-step deployment documentation and best practices"
        },
        {
          type: "video",
          url: "/demo-video.mp4",
          description: "Live demonstration of the pipeline in action",
          filename: "pipeline-demo.mp4"
        }
      ]
    }
  ];