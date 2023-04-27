//SPDX-License-Identifier: Unlicensed
pragma solidity >=0.4.22 <0.9.0;

contract myContract{

    struct document{
        uint256 id;
        string sName;
        string issueDate;
        address Issuer;
        address Student;
    }

    mapping(bytes32 => document) documents;
    event issued(bytes32 docId);

    function issueCred(uint256 _id, string memory _sName, string memory _issueDate, 
                        address _issuer, address _student)
    public returns (bytes32)
    {
        bytes32 docId = keccak256(abi.encodePacked(_id, _sName, _issueDate, _issuer));
        documents[docId] = document(_id, _sName, _issueDate, _issuer, _student);
        emit issued(docId);
        return docId;
    }

   

     function verifyCred(bytes32 _docId) public view returns (bool){
        bytes32 original = _docId;
        // require(documents[_docId].id!=0, "Credential does not exist");
        if(documents[_docId].id > 0)
        return true;
        else return false;
        // return documents[_docId].length > 0;
    }

}