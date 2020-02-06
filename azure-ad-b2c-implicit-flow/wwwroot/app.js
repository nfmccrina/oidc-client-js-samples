Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.DEBUG;

var OIDC_CONFIG = {
    authority: 'https://strangeloop.b2clogin.com/strangeloop.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_signin_test',
    client_id: 'e299a18e-8081-450c-aa78-9e20051ef4fb',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/signin-oidc.html`,
    post_logout_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: false,
    response_type: 'token id_token',
    scope: 'openid https://strangeloop.onmicrosoft.com/testapi/Api.Access',
    extraQueryParams: {
        resource: 'https://strangeloop.onmicrosoft.com/testapi'
    }
};

var mgr = new Oidc.UserManager(OIDC_CONFIG);

getUser().then(function(u) {
    updateDisplay(u);
});

function log(msg) {
    console.log(msg);
}

function setButtonValue(loggedIn) {
    document.getElementById('loginLogoutButton').innerText = loggedIn ? 'Logout' : 'Login';
}

function onButtonClick() {
    getUser().then(function(u) {
        return !!u;
    }).then(function (loggedIn) {
        if (loggedIn) {
            mgr.signoutRedirect().then(function() {
                log('sign out redirect complete');
            }).catch(function(err) {
                log(err);
            });
        } else {
            mgr.signinRedirect().then(function() {
                log('sign in redirect complete');
            }).catch(function(err) {
                log(err);
            });
        }
    });
}

function getUser() {
    return mgr.getUser().then(function(user) {
        if (user) {
            return `${user.profile.family_name}, ${user.profile.given_name}`;
        } else {
            return null;
        }
    }).catch(function(err) {
        log(err);
    });
}

function displayUserInfo(userInfo) {
    var wrapper = document.createElement('div');
    wrapper.id = 'userInfoSection';
    var content = document.createElement('p');
    content.innerText = userInfo ? userInfo : 'no user loaded';
    wrapper.appendChild(content);
    document.getElementById('userInfoSection').replaceWith(wrapper);
}

function updateDisplay(userInfo) {
    displayUserInfo(userInfo);
    setButtonValue(!!userInfo);
}