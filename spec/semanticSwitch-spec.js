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

    it ( 'should be an object, have a custom "CASE" method, which should be a function', function () {
        expect ( new SemanticSwitch ( inputPredicate () ) ).toEqual ( jasmine.any ( Object ) );
        expect ( new SemanticSwitch ( inputPredicate () ).CASE ).toEqual ( jasmine.any ( Function ) );
    } );

    it ( 'should execute the function the first function passed to "CASE", where the predicate matches the inputPredicate to "SemanticSwitch"', function () {
        new SemanticSwitch ( inputPredicate () )
            .CASE ( matchingPredicate (), matchingClause )
            .CASE ( nonMatchingPredicate (), nonMatchingClause );

        expect ( matchingClause ).toHaveBeenCalled ();
        expect ( nonMatchingClause ).not.toHaveBeenCalled ();
    } );

    it ( 'should not execute any function passed after the first matching "CASE", even if the predicate matches the inputPredicate to "SemanticSwitch"', function () {
        new SemanticSwitch ( inputPredicate () )
            .CASE ( matchingPredicate (), matchingClause )
            .CASE ( matchingPredicate (), nonMatchingClause );

        expect ( matchingClause ).toHaveBeenCalled ();
        expect ( nonMatchingClause ).not.toHaveBeenCalled ();
    } );

    it ( 'should execute the first function with a matching predicate passed after non-matching "Cases"', function () {
        new SemanticSwitch ( inputPredicate () )
            .CASE ( nonMatchingPredicate (), nonMatchingClause )
            .CASE ( matchingPredicate (), matchingClause );

        expect ( matchingClause ).toHaveBeenCalled ();
        expect ( nonMatchingClause ).not.toHaveBeenCalled ();
    } );

    it ( 'should execute the default function if no "CASE" predicates matched the inputPredicate to "SemanticSwitch"', function () {
        new SemanticSwitch ( inputPredicate () )
            .CASE ( nonMatchingPredicate (), nonMatchingClause )
            .CASE ( nonMatchingPredicate (), nonMatchingClause )
            .DEFAULT ( defaultClause );

        expect ( matchingClause ).not.toHaveBeenCalled ();
        expect ( nonMatchingClause ).not.toHaveBeenCalled ();
        expect ( defaultClause ).toHaveBeenCalled ();
    } );

    it ( 'should not execute the default function if any "CASE" predicates matched the inputPredicate to "SemanticSwitch"', function () {
        new SemanticSwitch ( inputPredicate () )
            .CASE ( nonMatchingPredicate (), nonMatchingClause )
            .CASE ( matchingPredicate (), matchingClause )
            .DEFAULT ( defaultClause );

        expect ( matchingClause ).toHaveBeenCalled ();
        expect ( nonMatchingClause ).not.toHaveBeenCalled ();
        expect ( defaultClause ).not.toHaveBeenCalled ();
    } );
} );
