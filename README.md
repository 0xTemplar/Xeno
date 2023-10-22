## Xeno Domains
Xeno is is a decentralized application (dApp) that empowers communities to create and manage custom decentralized top-level domains (dTLDs) on the Scroll Blockchain, all without writing a single line of code. Xeno is designed to provide an intuitive, user-friendly interface that simplifies the process of creating and managing dTLDs, making it accessible to everyone, regardless of their technical background.

## Problem Statement
- Many individuals, communities, and DAOs lack the technical expertise required to create their own decentralized top-level domains (dTLDs) on blockchain platforms.
- The current process for creating and managing dTLDs is complex, time-consuming, and requires coding knowledge, limiting accessibility.
- Existing solutions often lack user-friendly interfaces, hindering adoption and preventing wider participation in decentralized domain creation.

## Introducing Xeno
- Xeno is a revolutionary dApp that empowers communities to effortlessly create and manage custom decentralized Top-level domains that are linked to their wallet addresses on the Scroll Blockchain, without the need for any coding skills.

- We provide an intuitive and user-friendly interface that simplifies the process, making it accessible to everyone, regardless of their technical background.

- Xenos streamlines and automates the creation, management, and monetization of decentralized top-level domains, enabling seamless integration into the Scroll Blockchain's infrastructure. The service issues human readable addresses according to the TLD selection.

- Users can register custom top level domains such as ".scroll" or ".xeno", and access a minting page where they can mint their choice domain name or share with other community members

- Users can save pieces of data like their twitter profile link, personal website, etc in their domain.

## Domain Types
- **Standard (Transferable) Domains**: The standard domains are normal domains, similar to ENS / Unstoppable domains. They can be transferred from one owner to another, and can be sold on an NFT Marketplace
  
- **Soul Bound (Non-Transferable Domains)**: *The SBT Domain leverages the concept of a Soul Bound Token, is bound to the wallet and cannot be transfered. The metadata can only be updated.*

## Key Features and Benefits
**Simple and Intuitive Interface**: Xeno offers an easy-to-use interface that eliminates the need for technical expertise, enabling individuals, communities, and DAOs to effortlessly create their own dTLDs.

**Dynamic Tld Contract generation**: Users can easily create their own decentralized TLDs through a step-by-step process. Xenop Domains generates new TLD contracts based on parameters specified by the user.

**Enhanced Community Engagement**: Xeno fosters community involvement by enabling members to actively participate in the creation and governance of dTLDs, promoting inclusivity and collaboration.

**Interoperability and Scalability**: Xeno is built on the Scroll Sepolia Testnet, ensuring high throughput, low transaction costs, and seamless integration with other decentralized applications.

## Market Opportunity
- The market for decentralized domain creation is rapidly growing, with increasing demand from individuals, communities, and DAOs seeking to establish their unique online identities.
Xeno addresses the pain points faced by these entities, offering a comprehensive solution that simplifies the process, broadens accessibility, and encourages wider adoption.

- *As new communities, developers, and DAOs flock to build on the Scroll Blockchain's infrastructure, Xeno provides an invaluable service, enabling them to establish their own dTLDs quickly and easily.*
### Verified Contract Addresses

- Xeno Metadata Address: https://sepolia.scrollscan.dev/address/0xf9159A129145eB695c33D8920787119dfcbE0c24#code
- Xeno Forbidden Tlds: https://sepolia.scrollscan.dev/address/0xa8622A52C4fa5f2352107b1D5d7266EBd733Ffc1#code
- Xeno Domain Hub Address: https://sepolia.scrollscan.dev/address/0x84FF00826d9B63761C3455959aA3c71A0797F92b#code
- Xeno Standard Domain Factory Address: https://sepolia.scrollscan.dev/address/0x557a39105A2868Eb300814ac6a14DA174bFe20fC#code
- Xeno SBT Domain Factory Address: https://sepolia.scrollscan.dev/address/0x76c2Fb337839D6ca02ce268BC6d4b8E55c96b875#code
- Xeno Standard Domain Resolver Address: https://sepolia.scrollscan.dev/address/0xf0e3193c1a6dddc3c03bcb81e81bd3ceb69de817#code
- Xeno SBT Resolver Address: https://sepolia.scrollscan.dev/address/0x803F929Fa64dD93D50Bf0186416813F6A339f867#code

### Scroll Testnet related code
https://github.com/0xTemplar/Xeno/tree/master/contracts/contracts

### How It Works:
- **Top-Level Domain Factories**: It allows users to create TLDs by specifying the TLD name, symbol, owner, domain price, and buying availability(boolean). It generates new top level domain smart contracts, based on input specified by users. Each domain type, Standard and SBT have their own domain factory contract.
- **Forbidden Tlds**: To ensure proper coordination, a contract named ForbiddenTlds has been established, which maintains a record of all previously created top-level domains. Naturally, factories are prohibited from creating new TLDs that share the same name, as indicated by the "forbidden TLDs list. Some forbidden tlds include (.eth, .xeno)
- **Domain Resolver**: This serves as a convenient shortcut, although it is not essential for the system's functionality. With the Domain Resolver in place, there is no need to locate or store all TLD contract addresses. Instead, users simply need to be aware of one contract address (the resolver's address) and consistently resolve domains through that contract.
- **Metadata Contract**: The "XenoMetadata" contract provides a mechanism for TLD contracts to store and retrieve metadata, including descriptions, brand names, and associated SVG images. It serves as a metadata storage contract for top-level domain (TLD) contracts.

### User Flow

### Dashboard
![xeno-dashboard](https://github.com/0xTemplar/Xeno/assets/124390899/2477fabd-b07c-47be-8cfc-97cc376a89dc)

### Create Domain Page
![xeno-create](https://github.com/0xTemplar/Xeno/assets/124390899/b5a42059-5b9b-4375-8ee0-12c0402b0e3e)

### Create Domain Modal
![create-modal](https://github.com/0xTemplar/Xeno/assets/124390899/e96e03d0-1b00-46a3-bf12-f0c5d5f2d35e)

### Select Domain Minter
![minter-xeno](https://github.com/0xTemplar/Xeno/assets/124390899/20e940e9-8d94-46fe-ad0c-4b790fe49076)

### Domain Lookup
![xeno-lookup](https://github.com/0xTemplar/Xeno/assets/124390899/25f68e81-e967-4aa3-a847-fba038ae7201)

### Mint Domain Page
![mint-dom](https://github.com/0xTemplar/Xeno/assets/124390899/d134b486-4bed-411b-9893-bc808a18a054)

### Update Domain Metadata
![update xeno](https://github.com/0xTemplar/Xeno/assets/124390899/0e524f7f-0a32-4c90-8a24-9be2a247ac79)

### Change Domain Ownership
![transfer xeno](https://github.com/0xTemplar/Xeno/assets/124390899/d290a037-c2de-4e17-9b0f-12f7ac22d230)









   
