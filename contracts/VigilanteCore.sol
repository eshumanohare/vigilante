// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;

contract VigilanteCore {
    uint256 public departmentID;
    address public official;
    mapping(uint256 => FIR) private allFIRs;
    uint256[] public caseIDs;

    struct FIR_reportingOfficer {
        string name;
        uint256 badgeID;
        uint256 departmentID;
    }

    struct FIR_incident {
        uint256 date;
        uint256 time;
        string location;
        string description;
    }

    struct FIR_complainant {
        string name;
        string contact;
        string residentialAddress;
    }

    struct FIR_suspect {
        string name;
        string description;
        string lastSeenLocation;
    }

    struct FIR_witness {
        string name;
        string contact;
        string statement;
    }

    enum Status {
        UnderInvestigation,
        Caught,
        Solved,
        Closed
    }

    struct FIR {
        uint256 caseID;
        FIR_reportingOfficer officer;
        FIR_incident incident;
        FIR_complainant complainant;
        FIR_suspect[] suspects;
        FIR_witness[] witnesses;
        string[] evidences;
        Status status;
    }

    constructor(uint256 _departmentID, address _official) public {
        departmentID = _departmentID;
        official = _official;
    }

    function registerFIR(
        uint256 caseID,
        FIR_reportingOfficer calldata officer,
        FIR_incident calldata incident,
        FIR_complainant calldata complainant,
        FIR_suspect[] calldata suspects,
        FIR_witness[] calldata witnesses,
        string[] calldata evidences
    ) external OfficialOnly returns (bool) {
        require(caseIDs[caseID] == 0, "Error: Case ID already registered");
    }

    // modifiers
    modifier OfficialOnly() {
        require(msg.sender == official, "Error: You are not the official");
        _;
    }
}
