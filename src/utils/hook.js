/* eslint-disable no-restricted-globals */
import React from 'react';
import { CURRENT_USER_ROULS } from '../constants/common';
import { isEmpty } from './util';
import { getSession, remove } from './storage';
import { Redirect } from 'react-router-dom';

/**
 * @desc 用于在Root中添加一些钩子函数: checkLogin.
 **/
export function checkLogin(Component, props, roleType, Layout) {
    const userInfo = getSession('CURRENT_USER_INFO') || {};

    if(isEmpty(CURRENT_USER_ROULS[userInfo.roleType]) || userInfo.roleType !== roleType) {
        remove('OPEN_NEW_PAGE_PARAMS');
        remove('CURRENT_USER_INFO');
        return <Redirect to='/' />;
    }
    
    return Layout ? <Layout><Component {...props} /></Layout> : <Component {...props} />;
}
