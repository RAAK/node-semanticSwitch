var SemanticSwitch = require ( __dirname + '/../SemanticSwitch.js' ).SemanticSwitch;

var inputPredicate = function () { return 123; };
var matchingPredicate = inputPredicate;
var nonMatchingPredicate = function () { return 456; };

describe ( 'SemanticSwitch', function () {
    var matchingClause, nonMatchingClause, defaultClause;

    beforeEach ( function () {
        matchingClause = jasmine.createSpy ( 'matchingClause' );
        nonMatchingClause = jasmine.createSpy ( 'nonMatchingClause' );
        defaultClause = jasmine.createSpy ( 'defaultClause' );
    } );

    it ( 'should be an object, have a custom "Case" method, which should be a function', function () {
        expect ( new SemanticSwitch ( inputPredicate () ) ).toEqual ( jasmine.any ( Object ) );
        expect ( new SemanticSwitch ( inputPredicate () ).Case ).toEqual ( jasmine.any ( Function ) );
    } );

    it ( 'should execute the function the first function passed to "Case", where the predicate matches the inputPredicate to "SemanticSwitch"', function () {
        new SemanticSwitch ( inputPredicate () )
            .Case ( matchingPredicate (), matchingClause )
            .Case ( nonMatchingPredicate (), nonMatchingClause );

        expect ( matchingClause ).toHaveBeenCalled ();
        expect ( nonMatchingClause ).not.toHaveBeenCalled ();
    } );

    it ( 'should not execute any function passed after the first matching "Case", even if the predicate matches the inputPredicate to "SemanticSwitch"', function () {
        new SemanticSwitch ( inputPredicate () )
            .Case ( matchingPredicate (), matchingClause )
            .Case ( matchingPredicate (), nonMatchingClause );

        expect ( matchingClause ).toHaveBeenCalled ();
        expect ( nonMatchingClause ).not.toHaveBeenCalled ();
    } );

    it ( 'should execute the first function with a matching predicate passed after non-matching "Cases"', function () {
        new SemanticSwitch ( inputPredicate () )
            .Case ( nonMatchingPredicate (), nonMatchingClause )
            .Case ( matchingPredicate (), matchingClause );

        expect ( matchingClause ).toHaveBeenCalled ();
        expect ( nonMatchingClause ).not.toHaveBeenCalled ();
    } );

    it ( 'should execute the default function if no "Case" predicates matched the inputPredicate to "SemanticSwitch"', function () {
        new SemanticSwitch ( inputPredicate () )
            .Case ( nonMatchingPredicate (), nonMatchingClause )
            .Case ( nonMatchingPredicate (), nonMatchingClause )
            .Default ( defaultClause );

        expect ( matchingClause ).not.toHaveBeenCalled ();
        expect ( nonMatchingClause ).not.toHaveBeenCalled ();
        expect ( defaultClause ).toHaveBeenCalled ();
    } );

    it ( 'should not execute the default function if any "Case" predicates matched the inputPredicate to "SemanticSwitch"', function () {
        new SemanticSwitch ( inputPredicate () )
            .Case ( nonMatchingPredicate (), nonMatchingClause )
            .Case ( matchingPredicate (), matchingClause )
            .Default ( defaultClause );

        expect ( matchingClause ).toHaveBeenCalled ();
        expect ( nonMatchingClause ).not.toHaveBeenCalled ();
        expect ( defaultClause ).not.toHaveBeenCalled ();
    } );
} );
