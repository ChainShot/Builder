.. _abi_validations:

***************
ABI Validations
***************

These are a set of rules that help a user determine if the smart contract they
are writing are exposing properties as expected.

Since test cases often require that a function signature looks a particular way,
it's very easy to quickly guide the user and let them know if they are on the right
track.

Since compilation happens very quick relative to code execution validations
are often preferable to having a user execute their code and have to wait only
to find out they misnamed a function or forget to add a public keyword.

.. note::
    Within the Builder UI ABI Validations are validated as JSON. This makes it difficult
    for non-advanced content creators to edit for the moment.

Languages
=========

Since ABI Validations are used to validate the ABI created by EVM languages,
they are available for Solidity and Vyper only.

JSON Format
===========

ABI Validations store an array of JSON objects with properties that allow
ChainShot to take a contract, compile it to an ABI, and compare to see if
the properties exposed are as expected.

Here are the fields for each individual validation:

Fields
------

======================  ====================================================================
Field                   Description
======================  ====================================================================
id                      Mongo ID identifier
name                    The name of the exposed property
type                    The type of the exposed property
task_display            The task to show to the user, for them to satisfy this validation
constant                Is this a constant function?
payable                 Is this a payable function?
inputs                  An embedded array of required inputs
outputs                 An embedded array of required outputs
======================  ====================================================================
