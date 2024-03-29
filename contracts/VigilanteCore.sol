// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;

contract VigilanteCore {
    uint256 public departmentID;
    address public official;
    mapping(uint256 => FIR) private allFIRs;
    mapping(uint256 => mapping(address => bool)) approvals;

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
        string[] name;
        string description;
        string lastSeenLocation;
    }

    struct FIR_witness {
        string[] name;
        string[] contact;
        string[] statement;
    }

    enum Status {
        Registered,
        Caught,
        Solved,
        Closed
    }

    struct FIR {
        uint256 caseID;
        FIR_reportingOfficer officer;
        FIR_incident incident;
        FIR_complainant complainant;
        FIR_suspect suspects;
        FIR_witness witnesses;
        string evidences;
        Status status;
    }

    constructor(uint256 _departmentID, address _official) {
        departmentID = _departmentID;
        official = _official;
    }

    function registerFIR(
        uint256 caseID,
        FIR_reportingOfficer calldata officer,
        FIR_incident calldata incident,
        FIR_complainant calldata complainant,
        FIR_suspect calldata suspects,
        FIR_witness calldata witnesses,
        string calldata evidences
    ) external OfficialOnly PreventDOS(suspects, witnesses) returns (bool) {
        require(
            allFIRs[caseID].caseID == 0,
            "Error: Case ID already registered"
        );

        FIR memory fir = FIR({
            caseID: caseID,
            officer: officer,
            incident: incident,
            complainant: complainant,
            suspects: suspects,
            witnesses: witnesses,
            evidences: evidences,
            status: Status.Registered
        });

        allFIRs[caseID] = fir;
        approvals[caseID][official] = true;
        return true;
    }

    function updateStatus(
        uint256 caseID,
        Status _status
    ) external OfficialOnly returns (bool) {
        require(allFIRs[caseID].caseID != 0, "Error: Case ID not registered");
        FIR storage fir = allFIRs[caseID];
        fir.status = _status;
        return true;
    }

    function getFIRData(
        uint256 caseID
    ) external view ViewerOnly(caseID) returns (FIR memory fir) {
        require(allFIRs[caseID].caseID != 0, "Error: Case ID not registered");
        fir = allFIRs[caseID];
    }

    function approveView(
        uint256 caseID,
        address viewer
    ) external OfficialOnly returns (bool) {
        require(viewer != address(0), "Error: Address != 0x0");
        require(allFIRs[caseID].caseID != 0, "Error: Case ID not registered");
        require(
            !approvals[caseID][viewer],
            "Error: Viewer is already approved"
        );
        approvals[caseID][viewer] = true;
        return true;
    }

    // modifiers
    modifier OfficialOnly() {
        require(msg.sender == official, "Error: You are not the official");
        _;
    }

    modifier ViewerOnly(uint256 caseID) {
        require(
            approvals[caseID][msg.sender],
            "Error: Not approved to view FIR"
        );
        _;
    }

    modifier PreventDOS(
        FIR_suspect calldata suspects,
        FIR_witness calldata witnesses
    ) {
        require(
            suspects.name.length <= 5,
            "Note: You can add maximum 5 suspects. If more then add in description"
        );
        require(
            witnesses.name.length <= 5,
            "Note: You can add maximum 5 witnesses"
        );
        require(
            witnesses.name.length == witnesses.contact.length &&
                witnesses.name.length == witnesses.statement.length,
            "Error: Witness name, contact and statements should be equal"
        );
        _;
    }
}
