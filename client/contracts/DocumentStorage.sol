// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentStorage {
    // Mapping to store document hashes
    mapping(string => string) private documentHashes;

    // Event to log when a document hash is stored
    event DocumentHashStored(string indexed documentId, string documentHash);

    // Function to store a document hash
    function storeDocumentHash(string memory documentId, string memory documentHash) public {
        require(bytes(documentHashes[documentId]).length == 0, "Document ID already exists");
        documentHashes[documentId] = documentHash;
        emit DocumentHashStored(documentId, documentHash);
    }

    // Function to retrieve a document hash
    function getDocumentHash(string memory documentId) public view returns (string memory) {
        string memory hash = documentHashes[documentId];
        require(bytes(hash).length != 0, "Document ID does not exist");
        return hash;
    }
}