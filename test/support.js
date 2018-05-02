import { expect } from 'chai';
import sinon from 'sinon';

//Node has a global object to define properties in the global scope
//we need to add chai and sinon to this so they are available in our tests
global.expect = expect;
global.sinon = sinon;