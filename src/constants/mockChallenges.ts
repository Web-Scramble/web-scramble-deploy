import { Challenge } from '@/types/challenge';

export const mockChallenges: Challenge[] = [
  {
    id: 'ch_1',
    creator: {
      name: 'Sarah Chen',
      avatar: '/api/placeholder/32/32',
      initials: 'SC'
    },
    title: 'Quantum Computing Challenge: Optimization Problems',
    description: 'Develop a quantum algorithm to solve the traveling salesman problem more efficiently than classical approaches. This challenge focuses on implementing quantum circuits using Qiskit or Cirq, with emphasis on NISQ-era constraints.',
    endTime: '3d 8h',
    duration: '72h',
    reward: 2500,
    attachments: [
      { type: 'document', name: 'Challenge_Guidelines.pdf' },
      { type: 'video', name: 'Quantum_Basics.mp4' },
      { type: 'image', name: 'Circuit_Example.png' }
    ],
    participantCount: 156,
    remarks: [
      {
        id: 1,
        user: 'Alex Thompson',
        avatar: 'AT',
        content: 'Brilliant challenge! The quantum circuit optimization constraints make it particularly interesting.',
        timestamp: '2h ago',
        likes: 24
      },
      {
        id: 2,
        user: 'Maria Garcia',
        avatar: 'MG',
        content: 'Looking forward to applying quantum annealing concepts here.',
        timestamp: '1h ago',
        likes: 15
      }
    ],
    rankings: [
      {
        rank: 1,
        user: 'David Park',
        score: 980,
        remarks: [
          { id: 1, text: 'Exceptional quantum circuit design', date: '2024-01-04' },
          { id: 2, text: 'Innovative use of quantum gates', date: '2024-01-03' }
        ]
      },
      {
        rank: 2,
        user: 'Emma Wilson',
        score: 945,
        remarks: [
          { id: 1, text: 'Great optimization approach', date: '2024-01-04' }
        ]
      }
    ]
  },
  {
    id: 'ch_2',
    creator: {
      name: 'Michael Rodriguez',
      avatar: '/api/placeholder/32/32',
      initials: 'MR'
    },
    title: 'AI Model Deployment Challenge',
    description: 'Design and implement a scalable MLOps pipeline for deploying large language models in production. Focus on monitoring, A/B testing, and handling model drift in real-world scenarios.',
    endTime: '5d 12h',
    duration: '96h',
    reward: 3000,
    attachments: [
      { type: 'document', name: 'MLOps_Requirements.pdf' },
      { type: 'image', name: 'Architecture_Diagram.png' }
    ],
    participantCount: 234,
    remarks: [
      {
        id: 1,
        user: 'Nina Patel',
        avatar: 'NP',
        content: 'The focus on practical MLOps challenges is exactly what the industry needs.',
        timestamp: '4h ago',
        likes: 32
      }
    ],
    rankings: [
      {
        rank: 1,
        user: 'James Liu',
        score: 925,
        remarks: [
          { id: 1, text: 'Excellent pipeline architecture', date: '2024-01-04' }
        ]
      }
    ]
  },
  {
    id: 'ch_3',
    creator: {
      name: 'Sophie Anderson',
      avatar: '/api/placeholder/32/32',
      initials: 'SA'
    },
    title: 'Blockchain DeFi Security Challenge',
    description: 'Create a secure DeFi protocol implementation focusing on smart contract security, gas optimization, and protection against common attack vectors. Implement proper access controls and security measures.',
    endTime: '2d 6h',
    duration: '48h',
    reward: 4000,
    attachments: [
      { type: 'document', name: 'Security_Specs.pdf' },
      { type: 'video', name: 'Vulnerabilities_Demo.mp4' }
    ],
    participantCount: 189,
    remarks: [
      {
        id: 1,
        user: 'Raj Kumar',
        avatar: 'RK',
        content: 'The focus on security best practices in DeFi is crucial. Great challenge!',
        timestamp: '1h ago',
        likes: 28
      },
      {
        id: 2,
        user: 'Lisa Chen',
        avatar: 'LC',
        content: 'Interesting approach to testing various attack vectors.',
        timestamp: '30m ago',
        likes: 15
      }
    ],
    rankings: [
      {
        rank: 1,
        user: 'Tom Wilson',
        score: 960,
        remarks: [
          { id: 1, text: 'Strong security implementation', date: '2024-01-04' },
          { id: 2, text: 'Excellent gas optimization', date: '2024-01-03' }
        ]
      }
    ]
  }
];