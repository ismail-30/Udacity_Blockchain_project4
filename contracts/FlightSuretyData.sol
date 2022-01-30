pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract FlightSuretyData {
    using SafeMath for uint256;

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    address private contractOwner;                                      // Account used to deploy contract
    bool private operational = true;                                    // Blocks all state changes throughout the contract if false
    uint256 public numRegisteredAirlines;
    uint256 public numRegisteredPassengers;
    uint256 public numRegisteredFlights;

    struct Airline {
        string name;
        bool isRegistered;
        bool canParticipate;
        uint256 funds;
        address airlineAddress;
        mapping(address => mapping(bytes32 => uint256)) balances;     // Maps passenger address to money spent on each flight
        //bytes32[] flights;                                             // List of scheduled flights per airline
    }

    struct Flight {
        string number;
        bool isRegistered;
        uint8 statusCode;
        string updatedTimeStamp;        
        Airline airline;
        //address[] passengers;
    }

    struct Passenger {
        string name;
        address passengerAddress;
        bool isRegistered;
        uint256 credit;
    }
    mapping(address => Airline) private airlines;
    mapping(bytes32 => Flight) private flights;
    mapping(address => Passenger) private passengers;
    mapping(bytes32 => address[]) private passengersPerFlight;
    mapping(address => mapping(bytes32 => bool)) private isInsured;
    //mapping(address => bytes32[]) public flightsPerAirline;


    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/


    /**
    * @dev Constructor
    *      The deploying account becomes contractOwner
    */
    constructor(string _airlineName) 
    public 
    {
        contractOwner = msg.sender;
        airlines[msg.sender] = Airline({
                                        name: _airlineName,
                                        isRegistered: true,
                                        canParticipate: false,
                                        funds: 0,
                                        airlineAddress: msg.sender
                                     });
        numRegisteredAirlines = numRegisteredAirlines.add(1);
    }

    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/

    // Modifiers help avoid duplication of code. They are typically used to validate something
    // before a function is allowed to be executed.

    /**
    * @dev Modifier that requires the "operational" boolean variable to be "true"
    *      This is used on all state changing functions to pause the contract in 
    *      the event there is an issue that needs to be fixed
    */
    modifier isOperational() 
    {
        require(operational, "Contract is currently not operational");
        _;  // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
    * @dev Modifier that requires the "ContractOwner" account to be the function caller
    */
    modifier onlyContractOwner()
    {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    modifier onlyInsuredPassenger(address _passengerAddress, bytes32 key){
        require(isInsured[_passengerAddress][key], "This passenger is not insured");
        _;
    }



    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    /**
    * @dev Get operating status of contract
    *
    * @return A bool that is the current operating status
    */      
    function getOperationalStatus() 
    public 
    view 
    returns(bool) 
    {
        return operational;
    }


    /**
    * @dev Sets contract operations on/off
    *
    * When operational mode is disabled, all write transactions except for this one will fail
    */    
    function setOperatingStatus(bool mode) 
    external
    onlyContractOwner 
    {
        operational = mode;
    }

    /**


    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

   /**
    * @dev Add an airline to the registration queue
    *      Can only be called from FlightSuretyApp contract
    *
    */   
    function registerAirline(string _name, address _address)
    external
    isOperational
    {       
        airlines[_address] = Airline({
                                        name: _name,
                                        isRegistered: true,
                                        canParticipate: false,
                                        funds: 0,
                                        airlineAddress: _address
                                     });
        numRegisteredAirlines = numRegisteredAirlines.add(1);
    }

   /**
    * @dev Add an airline to the registration queue
    *      Can only be called from FlightSuretyApp contract
    *
    */   

    function registerFlight(address airlineAddress, bytes32 key, string flightNumber, string timeStamp, uint8 _statusCode)
    external
    isOperational
    {
        flights[key] = Flight({
                                number: flightNumber,
                                isRegistered: true,
                                statusCode: _statusCode,
                                updatedTimeStamp: timeStamp,
                                airline: airlines[airlineAddress]
                                });
        //airlines[airlineAddress].flights.push(key);
        //flightsPerAirline[airlineAddress].push(key);
        numRegisteredFlights = numRegisteredFlights.add(1);
    }

    function registerPassenger(address _airlineAddress, string _name, address _passengerAddress, bytes32 key, uint256 amount)
    external
    payable
    isOperational
    { 
        passengers[_passengerAddress] = Passenger({
                                        name: _name,
                                        passengerAddress: _passengerAddress,
                                        isRegistered: true,
                                        credit: 0
                                        
                                     });
        uint256 balance = airlines[_airlineAddress].balances[_passengerAddress][key];
        passengersPerFlight[key].push(_passengerAddress);
        //flights[key].passengers.push(_passengerAddress);
        airlines[_airlineAddress].balances[_passengerAddress][key] = balance.add(amount);
        numRegisteredPassengers = numRegisteredPassengers.add(1);
    }



    function updateFlightStatusCode(bytes32 key, uint8 _statusCode)
    external
    isOperational
    {      
        flights[key].statusCode = _statusCode;

    }

       /**
    * @dev Initial funding for the insurance. Unless there are too many delayed flights
    *      resulting in insurance payouts, the contract should be self-sustaining
    *
    */   
    function fund(address _airline, uint256 amount)
    external
    isOperational
    {
        airlines[_airline].funds.add(amount);
    }

   /**
    * @dev Buy insurance for a flight
    *
    */   
    function buyInsurance(address _passengerAddress, address _airlineAddress, bytes32 key, uint256 amount)
    external
    payable
    isOperational
    {
        airlines[_airlineAddress].balances[_passengerAddress][key].add(amount);
    }

    /**
     *  @dev Credits payouts to insuree
    */
    function creditInsuree(address _passengerAddress, bytes32 key, uint factor) 
    internal
    onlyInsuredPassenger(_passengerAddress, key)
    {
        uint256 _credit = airlines[msg.sender].balances[_passengerAddress][key].mul(factor);
        airlines[msg.sender].balances[_passengerAddress][key] = 0;
        passengers[_passengerAddress].credit.add(_credit);
    }

    function creditAllInsureesPerFlight(bytes32 key, uint factor) 
    external
    {
        address[] storage listOfPassengersAddress = passengersPerFlight[key];
        for (uint i=0; i < listOfPassengersAddress.length; i++) {
            creditInsuree(listOfPassengersAddress[i], key, factor);
        }
    }
    
    /**
     *  @dev Transfers eligible payout funds to insuree
     *
    */
    function withdraw()
    external
    payable
    {
        address targetAddress = msg.sender;
        targetAddress.transfer(passengers[msg.sender].credit);
        passengers[msg.sender].credit = 0;
    }

    /**
    * @dev Fallback function for funding smart contract.
    *
    */
    function() 
    external 
    payable 
    {

    }

    function getTotalBalance()
    external
    view
    returns(uint256)
    {
        return address(this).balance;
    }

    function getPassengerData(address _address) 
    external 
    view  
    isOperational 
    returns(string, bool, uint256)
    {
        Passenger storage passenger = passengers[_address];
        return (passenger.name, passenger.isRegistered, passenger.credit);
    }

    function getFlightDetails(bytes32 key) 
    external 
    view  
    isOperational 
    returns(string, bool, uint8, string, string)
    {
        Flight storage flight = flights[key];
        return (flight.number, 
                flight.isRegistered, 
                flight.statusCode, 
                flight.updatedTimeStamp,
                flight.airline.name);
    }

    function getInsuranceStatus(address _passengerAddress, bytes32 flighKey) 
    external 
    view  
    isOperational 
    returns(bool)
    {
        return isInsured[_passengerAddress][flighKey];
    }

    function getAirlineData(address _airlineAddress)
    external
    view
    isOperational
    returns(string, bool, bool, uint256)
    {
        Airline storage airline = airlines[_airlineAddress];
        return(airline.name, airline.isRegistered, airline.canParticipate, airline.funds);

    }


    function setParticipationStatus(address airlineAddress, bool status) 
    external 
    isOperational
    {
        airlines[airlineAddress].canParticipate = status;
    }

    function checkPassengerInsuranceStatus(address passengerAddress, bytes32 flightKey)
    external
    isOperational
    view
    returns(bool)
    {
        return isInsured[passengerAddress][flightKey];
    }


}
