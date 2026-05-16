# Quick Voting

A secure, decentralized voting platform built with React, Vite, and Web3 technologies. This application provides a comprehensive solution for transparent elections, featuring Instant Runoff Voting (IRV) smart contract integration and designated interfaces for administrators, organizations, auditors, and voters.

## Features

- **Decentralized Voting:** Powered by blockchain technology for maximum transparency and security.
- **Instant Runoff Voting (IRV):** Advanced on-chain polling mechanisms.
- **Role-based Access & Dashboards:**
  - **Admin Dashboard:** Manage platform-level configurations, view organizations, and oversee auditors.
  - **Organization Dashboard:** Register your organization, create and manage custom polls.
  - **Auditor Dashboard:** Verify poll integrity and monitor ongoing elections independently.
  - **Voter Profile:** Secure, authenticated, and seamless voting experience.
- **On-chain Validations:** Direct execution and real-time reads from deployed smart contracts using custom Web3 hooks.

## Tech Stack

- **Frontend:** React, Vite
- **Web3 Integration:** Custom Web3 Context, Smart Contract ABI Integration (`IRVVotingABI`), and custom hooks (Read/Write on-chain capabilities).
- **Styling:** CSS (App/Index.css)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn
- A Web3 wallet browser extension (e.g., MetaMask)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd Quick-voting
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

## Smart Contract Integration

This frontend utilizes an external smart contract for vote processing. Make sure your Web3 wallet is configured to connect to the correct chain where the `IRVVoting` contract is deployed.
