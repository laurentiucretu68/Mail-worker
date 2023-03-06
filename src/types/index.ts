'use strict';

import { ObjectId } from "mongodb";

/** USER TYPES**/

export interface User {
    _id?: ObjectId,
    name: string,
    email: string
    password: string
};

export interface Client extends User {
    phoneNumber: string
};