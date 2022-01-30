const dataContract = artifacts.require('FlightSuretyData');
const appContract = artifacts.require('FlightSuretyApp');

contract('Flight Surety Test', accounts => {
    const owner = accounts[0];
    const firstAirlineName = "Jet Blue";
    const flightNumber = "JB1234";

    // describe('Flight Surety Data: Test is operational status', function () {
    //     beforeEach(async function () { 
    //         flightDataInstance = await dataContract.new(firstAirlineName, {from: owner});

    //     })

    //     it('should make the contract operational right after deployment', async function () { 
    //         let isOperational = await flightDataInstance.getOperationalStatus.call();
    //         assert.equal(isOperational, true);
            
    //     })

    //     it('should allow the owner to change the operating status', async function () { 
    //         await flightDataInstance.setOperatingStatus(false, {from:owner});
    //         let isOperational = await flightDataInstance.getOperationalStatus.call();
    //         assert.equal(isOperational, false);
            
    //     })

    //     it('should only allow the owner to change the operating status', async function () { 
    //         let hasChanged = false;
    //         try {
    //             await flightDataInstance.setOperatingStatus(false, {from:accounts[1]});
    //             hasChanged = true;
    //         }
    //         catch(e){
    //         }
    //         let isOperational = await flightDataInstance.getOperationalStatus.call();
    //         assert.equal(hasChanged, false);
            
    //     })

    // });

    // describe('Flight Surety Data: Test Airline Contract Initialization', function () {
    //     beforeEach(async function () { 
    //         flightDataInstance = await dataContract.new(firstAirlineName, {from: owner});

    //     })

    //     it('should register the first airline upon deployment', async function () { 
    //         let num = await flightDataInstance.numRegisteredAirlines.call();
    //         let data = await flightDataInstance.getAirlineData.call(owner);
            
    //         assert.equal(num, 1);
    //         assert.equal(data[0], firstAirlineName)
            
    //     })

    // });

    // describe('Flight Surety App: Airlines - Test MultiParty consensus - Registration', function () {
    //     beforeEach(async function () { 
    //         flightDataInstance = await dataContract.new(firstAirlineName, {from: owner});
    //         flightAppInstance = await appContract.new(flightDataInstance.address, {from: owner});

    //     })

    //     it('it should allow only registered airline to register up to 4 airlines without Multi Pary consensus', async function () { 
    //         await flightAppInstance.registerAirline("British Airways", accounts[1], {from: owner});
    //         await flightAppInstance.registerAirline("EasyJet", accounts[2], {from: accounts[1]});
    //         await flightAppInstance.registerAirline("Udacity Airlines", accounts[3], {from: accounts[2]});
    //         let num = await flightDataInstance.numRegisteredAirlines.call();
    //         assert.equal(num, 4);

    //         // account[6] is not a registered airline therefore the following action should fail
    //         let regsitered = true;
    //         try {
    //             await flightAppInstance.registerAirline("Udacity Airlines", accounts[3], {from: accounts[6]});
    //         } catch(e){
    //             regsitered = false
    //         }
    //         assert.equal(regsitered, false);

    //     })

    //     it('it should not allow registering the fifth airlines without Multi Pary consensus', async function () { 
    //         await flightAppInstance.registerAirline("British Airways", accounts[1], {from: owner});
    //         await flightAppInstance.registerAirline("EasyJet", accounts[2], {from: accounts[1]});
    //         await flightAppInstance.registerAirline("Udacity Airlines", accounts[3], {from: accounts[2]});
    //         await flightAppInstance.registerAirline("American Airlines", accounts[4], {from: accounts[2]});

    //         let num = await flightDataInstance.numRegisteredAirlines.call();
    //         assert.equal(num, 4);

    //     })

    // });


    // describe('Flight Surety App: Airlines - Test MultiParty consensus - Funding & Voting', function () {
    //     beforeEach(async function () { 
    //         flightDataInstance = await dataContract.new(firstAirlineName, {from: owner});
    //         flightAppInstance = await appContract.new(flightDataInstance.address, {from: owner});

    //         await flightAppInstance.registerAirline("British Airways", accounts[1], {from: owner});
    //         await flightAppInstance.registerAirline("EasyJet", accounts[2], {from: accounts[1]});
    //         await flightAppInstance.registerAirline("Udacity Airlines", accounts[3], {from: accounts[2]});
    //         await flightAppInstance.registerAirline("American Airlines", accounts[4], {from: accounts[2]});
    //         await flightAppInstance.registerAirline("Singapore Airlines", accounts[5], {from: accounts[2]});

    //     })

    //     it('it should add the fifth airline and subsequent to the voting queue', async function () { 
    //         let bool_1 = await flightAppInstance.isInQueue.call(accounts[3]);
    //         let bool_2 = await flightAppInstance.isInQueue.call(accounts[4]);
    //         let bool_3 = await flightAppInstance.isInQueue.call(accounts[5]);
    //         assert.equal(bool_1, false);
    //         assert.equal(bool_2, true);
    //         assert.equal(bool_3, true);

    //     })

    //     it('it should only allow fully funded airlines to vote on airlines in the queue', async function () { 
    //         await flightAppInstance.fundAirline({from: owner, value:web3.utils.toWei('10', 'ether')});
    //         await flightAppInstance.voteAirline(accounts[4], {from: owner});
    //         let bool_1 = await flightAppInstance.checkIfVoted.call(owner, accounts[4]);
    //         assert.equal(bool_1, true);

    //        let bool_2 = true;
    //        try {
    //            await flightAppInstance.fundAirline({from: accounts[2], value:web3.utils.toWei('4', 'ether')});
    //            await flightAppInstance.voteAirline(accounts[4], {from: accounts[2]});
    //        } catch(e){
    //             bool_2 = await flightAppInstance.checkIfVoted.call(accounts[2], accounts[4]);
    //        }
    //        assert.equal(bool_2, false);
  
    //     })

    //     it('it should allow registering an airline in the queue if at least 50% of participated airlines have voted', async function () { 
    //         // Fund airlines
    //         await flightAppInstance.fundAirline({from: owner, value:web3.utils.toWei('10', 'ether')});
    //         await flightAppInstance.fundAirline({from: accounts[1], value:web3.utils.toWei('10', 'ether')});
    //         await flightAppInstance.fundAirline({from: accounts[2], value:web3.utils.toWei('10', 'ether')});
    //         await flightAppInstance.fundAirline({from: accounts[3], value:web3.utils.toWei('10', 'ether')});

    //         // Vote airlines in the queue
    //         await flightAppInstance.voteAirline(accounts[4], {from: owner});
    //         await flightAppInstance.voteAirline(accounts[4], {from: accounts[1]});
    //         await flightAppInstance.voteAirline(accounts[4], {from: accounts[2]});
    //         let votes = await flightAppInstance.votesPerAirline.call(accounts[4])

    //         // register airline
    //         await flightAppInstance.registerAirline("American Airlines", accounts[4], {from: owner});

    //         let isRegistered = await flightAppInstance.getAirlineRegistrationStatus.call(accounts[4]);
            
    //         assert.equal(isRegistered, true);
    //         assert.equal(votes, 3);

    //     })


    // });

    // describe('Flight Surety App: Airlines - Register Flights', function () {
    //     beforeEach(async function () { 
    //         flightDataInstance = await dataContract.new(firstAirlineName, {from: owner});
    //         flightAppInstance = await appContract.new(flightDataInstance.address, {from: owner});

    //         // register Airline
    //         await flightAppInstance.registerAirline("British Airways", accounts[1], {from: owner});
    //         // Fund airline
    //         await flightAppInstance.fundAirline({from: owner, value:web3.utils.toWei('10', 'ether')});

    //     })

    //     it('it should allow the airline to register flights', async function () { 
    //         let flightNumber_1 = "BA123"
    //         let flightTimeStamp_1 = "22/01/2022-20:45"
    //         let flightNumber_2 = "BA456"
    //         let flightTimeStamp_2 = "12/02/2022-21:45"

    //         let tx_1 = await flightAppInstance.registerFlight(flightNumber_1, flightTimeStamp_1, {from:owner})
    //         let tx_2 = await flightAppInstance.registerFlight(flightNumber_2, flightTimeStamp_2, {from:owner})


    //         assert.equal(tx_1.logs[0].event, 'FlightRegistered');
    //         assert.equal(tx_2.logs[0].event, 'FlightRegistered');

    //         // check total number of flights so far
    //         let num = await flightDataInstance.numRegisteredFlights.call();
    //         assert.equal(num, 2);

    //     })

    // });


     describe('Flight Surety App: Passengers registration and insurance payout', function () {
        beforeEach(async function () { 
            flightDataInstance = await dataContract.new(firstAirlineName, {from: owner});
            flightAppInstance = await appContract.new(flightDataInstance.address, {from: owner});

            // register Airlines
            await flightAppInstance.registerAirline("British Airways", accounts[1], {from: owner});
            await flightAppInstance.registerAirline("EasyJet", accounts[2], {from: accounts[1]});
            await flightAppInstance.registerAirline("Udacity Airlines", accounts[3], {from: accounts[2]});

            // Fund airlines
            await flightAppInstance.fundAirline({from: owner, value:web3.utils.toWei('10', 'ether')});
            await flightAppInstance.fundAirline({from: accounts[1], value:web3.utils.toWei('10', 'ether')});
            await flightAppInstance.fundAirline({from: accounts[2], value:web3.utils.toWei('10', 'ether')});
            await flightAppInstance.fundAirline({from: accounts[3], value:web3.utils.toWei('10', 'ether')});

        })

        it('it should allow passengers to register for an existing flight and buy ticket', async function () { 
            // Register a Flight
            let flightNumber_1 = "JB123"
            let flightTimeStamp_1 = "22/01/2022-20:45"
            let passengerName = "John"
            await flightAppInstance.registerFlight(flightNumber_1, flightTimeStamp_1, {from:owner})
            
            let tx = await flightAppInstance.registerPassenger(passengerName, owner, flightNumber_1, flightTimeStamp_1, 
                                                                {from:accounts[6], value:web3.utils.toWei('1', 'ether')})
            assert.equal(tx.logs[0].event, 'PassengerRegistered');
            // check total number of passengers so far
            let num = await flightDataInstance.numRegisteredPassengers.call();
            assert.equal(num, 1);


        })

        it('it should reject passenger registration is flight does not exist', async function () { 
            let flag = false
            try{
                await flightAppInstance.registerPassenger(passengerName, owner, "FAKE123", "12/12/2030-00:00", 
                                                    {from:accounts[6], value:web3.utils.toWei('1', 'ether')})
                flag = true
            } catch(e){

            }
            assert.equal(flag, false);

            // check total number of passengers so far
            let num = await flightDataInstance.numRegisteredPassengers.call();
            assert.equal(num, 0);
        })


        it('it should allow registered passengers to purchase insurance for up to 1 ether', async function () { 
            let flightNumber_1 = "BA123"
            let flightTimeStamp_1 = "22/01/2022-20:45"
            let passengerName = "John"
            let airlineAddress = accounts[1]
            let passengerAddress = accounts[6]

            await flightAppInstance.registerFlight(flightNumber_1, flightTimeStamp_1, {from:airlineAddress})
            await flightAppInstance.registerPassenger(passengerName, airlineAddress, flightNumber_1, flightTimeStamp_1, 
                                                        {from:passengerAddress, value:web3.utils.toWei('1', 'ether')})

            await flightAppInstance.buyInsurance(airlineAddress, flightNumber_1, flightTimeStamp_1, 
                                                    {from:passengerAddress, value:web3.utils.toWei('1', 'ether')})

            
            let isInsured = await flightAppInstance.checkPassengerInsuranceStatus.call(passengerAddress, 
                                                                                        airlineAddress, 
                                                                                        flightNumber_1, 
                                                                                        flightTimeStamp_1)

            assert.equal(isInsured, true);

        })


        it('it should credit passengers with 1.5 they amount they paid if flight is delayed due to airlines fault', async function () { 


        })


        it('it should allow passengers to withdraw funds after being credited - payout not sent directly to passengers', async function () { 


        })

    });


    // describe('Oracles (Server App): Registration and flight status handling', function () {
    //     beforeEach(async function () { 
    //         flightDataInstance = await dataContract.new(firstAirlineName, {from: owner});
    //         flightAppInstance = await appContract.new(flightDataInstance.address, {from: owner});

    //         await flightAppInstance.registerAirline("British Airways", accounts[1], {from: owner});
    //         await flightAppInstance.registerAirline("EasyJet", accounts[2], {from: accounts[1]});
    //         await flightAppInstance.registerAirline("Udacity Airlines", accounts[3], {from: accounts[2]});

    //     })

    //     it('it can register an Oracle with an assigned index', async function () { 


    //     })


    //     it('it should allow Oracles to respond to events from flight surety app', async function () { 


    //     })


    //     it('it should properly respond to contract event with updated flight status', async function () { 


    //     })




    // });




    
})