/**
 * stores all apis urls
 */


const pathPrefix = "/api/"


const apis = {
    // system apis
    swipeListUrl:  pathPrefix +  'system/swipe/list',
    sendVerificationUrl: pathPrefix + 'system/send/verification',

    // user account apis
    loginUrl :  pathPrefix + 'account/login',
    logoutUrl :  pathPrefix + 'account/logout',
    infoUrl :  pathPrefix + 'account/info',
    registerUrl :  pathPrefix + 'account/register',

    // attraction apis
    attractionListUrl: pathPrefix + 'attraction/attraction/list',
    attractionDetailUrl: pathPrefix + 'attraction/attraction/detail/#{id}',
    attractionInfoUrl: pathPrefix + 'attraction/attraction/info/#{id}',
    attractionImagesUrl: pathPrefix + 'attraction/attraction/images/#{id}',
    ticketListUrl: pathPrefix + 'attraction/ticket/list/#{id}',
    commentListUrl: pathPrefix + 'attraction/comment/list/#{id}',
    commentPostUrl: pathPrefix + 'attraction/comment/post',
    ticketDetailUrl: pathPrefix + 'attraction/ticket/detail/#{id}',
    ticketInfoUrl: pathPrefix + 'attraction/ticket/info/#{id}',


    // order apis
    OrderSubmitUrl: pathPrefix + 'order/order/submit',
    OrderDetailUrl: pathPrefix + 'order/order/detail/#{sn}',
    OrderListUrl: pathPrefix + 'order/order/list',
}

export {
    apis
}

