(function () {

    $app.survey.library['cms/oauth.provider.js'] = {
        "text": "OAuth Identity Provider",
        "description": "Register the Single Sign-On identity provider.",
        //"cache": false,
        topics: [
            {
                //text: 'General',
                questions: [
                    {
                        name: "AuthenticationType",
                        text: 'Identity Provider',
                        placeholder: '(select)',
                        tooltip: 'The authentication provider.',
                        required: true,
                        value: null,
                        items: {
                            style: 'RadioButtonList',
                            list: [
                                { value: 'appidentity', text: 'App Identity' },
                                { value: 'facebook', text: 'Facebook' },
                                { value: 'google', text: 'Google' },
                                { value: 'msgraph', text: 'Microsoft Graph' },
                                { value: 'linkedin', text: 'LinkedIn' },
                                { value: 'windowslive', text: 'Windows Live' },
                                { value: 'sharepoint', text: 'SharePoint' },
                                { value: 'identityserver', text: 'Identity Server' },
                                { value: 'dnn', text: 'DotNetNuke' }
                            ]
                        },
                        readOnlyWhen: 'this.survey().context.SiteContentID != null',
                        options: {
                            lookup: {
                                openOnTap: true,
                                nullValue: false,
                                autoAdvance: 'row'
                            }
                        }
                    },
                    {
                        name: 'SharedDatabase',
                        type: 'bool',
                        items: {
                            style: 'CheckBox'
                        },
                        visibleWhen: '$row.AuthenticationType === "appidentity"',
                        options: {
                            clearOnHide: true
                        }
                    },
                    {
                        name: 'ClientId',
                        required: true,
                        placeholder: 'Unique ID for this application.',
                        tooltip: 'Client identifier used by the authentication provider to look up configuration.',
                        visibleWhen: '$row.AuthenticationType != null && $row.AuthenticationType != null && !$row.SharedDatabase'
                    },
                    {
                        name: 'ClientSecret',
                        required: true,
                        placeholder: 'Secret key for server-to-server communication.',
                        tooltip: 'Secret value used to authenticate server-to-server communications.',
                        visibleWhen: '$row.AuthenticationType != null && !$row.SharedDatabase'
                    },
                    {
                        name: 'ClientUri',
                        text: 'Provider Uri',
                        required: true,
                        placeholder: 'The root URL of the authentication server.',
                        tooltip: 'The web address of the authentication provider.',
                        causesCalculate: true,
                        visibleWhen: '$row.AuthenticationType != null && ($row.AuthenticationType.match(/dnn|sharepoint|identityserver|appidentity/))'
                    },
                    {
                        name: 'LocalClientUri',
                        text: 'Local Provider Uri',
                        required: false,
                        placeholder: 'The local root URL of the authentication server.',
                        tooltip: 'The local web address of the authentication provider.',
                        causesCalculate: true,
                        visibleWhen: '$row.AuthenticationType == "appidentity"',
                        options: {
                            clearOnHide: true
                        }
                    },
                    {
                        name: 'TenantID',
                        placeholder: 'ID of the tenant. Enter "common" for general purpose use.',
                        tooltip: 'Identifier of the authentication service used by Microsoft Graph API.',
                        visibleWhen: '$row.AuthenticationType == "msgraph"',
                        options: {
                            clearOnHide: true
                        }
                    },
                    {
                        name: 'RedirectUri',
                        placeholder: 'Public address of the app.',
                        tooltip: 'Publicly accessible address that clients will use to connect to this app.',
                        required: true,
                        causesCalculate: true,
                        visibleWhen: '$row.AuthenticationType != null && $row.SharedDatabase != true'
                    },
                    {
                        name: 'LocalRedirectUri',
                        placeholder: 'Local development URL for testing.',
                        tooltip: 'Used in place of the Redirect Uri when app detects that it is running locally.',
                        causesCalculate: true,
                        visibleWhen: '$row.AuthenticationType != null && !$row.AuthenticationType.match(/dnn|sharepoint/)  && $row.SharedDatabase != true',
                        options: { clearOnHide: true }
                    },
                    {
                        name: 'Scope',
                        placeholder: 'Specify a space-separated list of scopes. By default, only basic profile, email address, and profile picture are requested.',
                        tooltip: 'Specify additional scopes that will be requested in the authentication request.',
                        visibleWhen: '$row.AuthenticationType != null && $row.AuthenticationType != "dnn"',
                        options: { clearOnHide: true }
                    },
                    {
                        name: 'Tokens',
                        length: 4000,
                        rows: 3,
                        placeholder: 'Specify a space-separated list of tokens.',
                        tooltip: 'List of DotNetNuke tokens that will be queried from the portal and saved to the user profile on login. These tokens can be accessed in business rules.',
                        visibleWhen: '$row.AuthenticationType == "dnn"',
                        options: { clearOnHide: true }
                    },
                    {
                        name: 'ProfileFieldList',
                        placeholder: 'Please enter an optional comma-separated list of fields for the user profile. By default only email field is requested.',
                        tooltip: 'Optional comma-separated list of fields for the user profile. For example, last_name, first_name, name, etc.',
                        visibleWhen: '$row.AuthenticationType == "facebook"',
                        options: { clearOnHide: true }
                    },
                    {
                        name: 'SyncUser',
                        type: 'Boolean',
                        value: true,
                        text: 'Synchronize users with authentication provider',
                        tooltip: 'When enabled, new users authenticated by the provider will have matching accounts created locally.',
                        visibleWhen: '$row.AuthenticationType != null && $row.AuthenticationType != "appidentity"',
                        items: {
                            style: 'CheckBox'
                        }
                    },
                    {
                        name: 'SyncRoles',
                        type: 'Boolean',
                        value: true,
                        text: 'Synchronize user roles with authentication provider',
                        tooltip: 'When enabled, roles returned by the provider will be synchronized to the matching local user account.',
                        visibleWhen: '$row.AuthenticationType != null && !$row.AuthenticationType.match(/facebook|windowslive|linkedin|appidentity/) && $row.SyncUser == true',
                        items: { style: 'CheckBox' },
                        options: { clearOnHide: true }
                    },
                    {
                        name: 'AutoLogin',
                        type: 'Boolean',
                        text: 'Force users to login with this provider',
                        tooltip: 'When enabled, anonymous users that attempt to navigate to the app will be directed to login with this provider.',
                        visibleWhen: '$row.AuthenticationType != null',
                        items: { style: 'CheckBox' }
                    },
                    {
                        name: 'AccessToken',
                        visibleWhen: '$row.AccessToken != null'
                    },
                    {
                        name: 'RefreshToken',
                        visibleWhen: '$row.RefreshToken != null'
                    }
                ]
            }
        ],
        buttons: [
            {
                id: 'a1',
                text: 'Add System Account',
                click: 'oauthregistrationaddsys.cms.app',
                //scope: 'context',
                when: function (e) {
                    return (this.fieldValue('AuthenticationType') || '').match(/sharepoint|google|msgraph|identityserver/);
                }
            }
        ],
        "options": {
            "modal": {
                "fitContent": true,
                "autoGrow": true,
                max: 'sm'
            },
            "materialIcon": "settings_input_antenna",
            "discardChangesPrompt": false
        },
        "init": 'oauthregistrationinit.cms.app',
        "calculate": 'oauthregistrationcalc.cms.app',
        "submit": "oauthregistrationsubmit.cms.app",
        'submitText': Web.DataViewResources.ModalPopup.SaveButton
    };

    $(document).on('oauthregistrationinit.cms.app', function (e) {
        //$app.alert($app.survey._data.Text);
        var context = e.survey.context;
        if (context) {
            e.rules.updateFieldValue('AuthenticationType', context.FileName);
            if (context.Text) {
                context._skipCalc = true;
                var map = textToConfig(context.Text);
                e.rules.updateFieldValue('ClientId', map.ClientId);
                e.rules.updateFieldValue('ClientSecret', map.ClientSecret);
                e.rules.updateFieldValue('SharedDatabase', !!map.SharedDatabase);
                e.rules.updateFieldValue('LocalClientUri', map.LocalClientUri);
                e.rules.updateFieldValue('ClientUri', map.ClientUri);
                e.rules.updateFieldValue('TenantID', map.TenantID);
                e.rules.updateFieldValue('RedirectUri', map.RedirectUri);
                e.rules.updateFieldValue('LocalRedirectUri', map.LocalRedirectUri);
                e.rules.updateFieldValue('Scope', map.Scope);
                e.rules.updateFieldValue('Tokens', map.Tokens);
                e.rules.updateFieldValue('ProfileFieldList', map.ProfileFieldList);
                e.rules.updateFieldValue('SyncUser', map.SyncUser == 'true');
                e.rules.updateFieldValue('SyncRoles', map.SyncRoles == 'true');
                e.rules.updateFieldValue('AutoLogin', map.AutoLogin == 'true');
                e.rules.updateFieldValue('AccessToken', map.AccessToken);
                e.rules.updateFieldValue('RefreshToken', map.RefreshToken);
            }
        }
    }).on('oauthregistrationcalc.cms.app', function (e) {
        try {
            var data = e.dataView.data(),
                trigger = e.rules.trigger(),
                context = e.survey.context,
                newUri;
            if (context && context._skipCalc) {
                delete context._skipCalc;
                return;
            }
            if (trigger == 'RedirectUri' && data.RedirectUri) {
                //newUri = validateRedirectUri(data.RedirectUri, data.AuthenticationType);
                //    if (newUri != data.RedirectUri)
                //        e.rules.updateFieldValue('RedirectUri', newUri);
            }
            else if (trigger == 'LocalRedirectUri' && data.LocalRedirectUri) {
                //newUri = validateRedirectUri(data.LocalRedirectUri, data.AuthenticationType, true);
                //if (newUri != data.LocalRedirectUri)
                //    e.rules.updateFieldValue('LocalRedirectUri', newUri);
            }
            else if (trigger == 'ClientUri') {
                //if (data.ClientUri)
                //    $app.touch.notify(data.ClientUri);
            }
        }
        catch (ex) {
            alert(ex);
        }
    }).on('oauthregistrationaddsys.cms.app', function (e) {
        e.preventDefault();
        var data = $app.touch.dataView().data();
        saveConfig(e.survey.context, data, function () {
            location.href = '../appservices/saas/' + data.AuthenticationType + '?storeToken=true&start=%2Fpages%2Fsite-content';
        });
    }).on('oauthregistrationsubmit.cms.app', function (e) {
        e.preventDefault();
        saveConfig(e.survey.context, $app.touch.dataView().data());
    });

    function validateRedirectUri(uri, type, httpOnly) {
        if (typeof uri == 'string') {
            var path = '/appservices/saas/' + type;
            if (!uri.endsWith(path)) {
                var url = new URL(path, uri);
                uri = url.href;
            }
        }
        return uri;
    }


    function saveConfig(context, data, callback) {
        var opts = {
            controller: 'SiteContent',
            values: [{ name: 'Text', newValue: configToText(data) }],
            done: function (result) {
                if (result.errors && result.errors.length)
                    $app.alert(result.errors[0]);
                else if (callback)
                    callback(result);
                else {
                    $app.touch.goBack(function () {
                        $app.touch.dataView().sync(context.SiteContentID || result.SiteContent.SiteContentID);
                    });
                }
            }
        };


        if (context.SiteContentID) {
            opts.view = 'editForm1';
            opts.command = 'Update';
            opts.values.push(
                { name: 'SiteContentID', oldValue: context.SiteContentID },
                { name: 'FileName', value: data.AuthenticationType },
                { name: 'Path', value: 'sys/saas' });
            $app.execute(opts);
        }
        else {
            opts.view = 'createForm1';
            opts.command = 'Insert';
            opts.values.push(
                { name: 'SiteContentID', value: null },
                { name: 'FileName', newValue: data.AuthenticationType },
                { name: 'Path', newValue: 'sys/saas' });

            // check for existing record
            $app.execute({
                controller: 'SiteContent',
                view: 'grid1',
                filter: [
                    { name: 'FileName', value: data.AuthenticationType, op: '=' },
                    { name: 'Path', value: 'sys/saas', op: '=' }
                ],
                done: function (result) {
                    if (result.SiteContent.length > 0)
                        $app.touch.goBack(function () {
                            $app.alert('OAuth registration "sys/saas/' + data.AuthenticationType + '" already exists.');
                        });
                    else
                        $app.execute(opts);
                }
            });
        }
    }
    function NormalizeUrl(url) {
        if (typeof url == 'string')
            try {
                if (!url.match(/^http/i))
                    url = 'http://' + url;
                var normalUrl = new URL(url);
                url = normalUrl.toString();
            }
            catch (err) {
                // do nothing
            }
        return url;
    }

    function configToText(data) {
        var lines = [];
        if (data.ClientId)
            lines.push('Client Id: ' + data.ClientId);
        if (data.ClientSecret)
            lines.push('Client Secret: ' + data.ClientSecret);
        if (data.SharedDatabase)
            lines.push('Shared Database: true');
        if (data.RedirectUri)
            lines.push('Redirect Uri: ' + validateRedirectUri(NormalizeUrl(data.RedirectUri), data.AuthenticationType));
        if (data.AuthenticationType != 'dnn' && data.LocalRedirectUri)
            lines.push('Local Redirect Uri: ' + validateRedirectUri(NormalizeUrl(data.LocalRedirectUri), data.AuthenticationType));
        if (data.SyncUser)
            lines.push('Sync User: true');
        if (data.SyncRoles)
            lines.push('Sync Roles: true');
        if (data.AutoLogin)
            lines.push('Auto Login: true');
        if (data.AuthenticationType.match(/dnn|sharepoint|identityserver|appidentity/) && data.ClientUri)
            lines.push('Client Uri: ' + NormalizeUrl(data.ClientUri));
        if (data.AuthenticationType.match(/dnn|sharepoint|identityserver|appidentity/) && data.LocalClientUri)
            lines.push('Local Client Uri: ' + NormalizeUrl(data.LocalClientUri));
        if (data.AuthenticationType == 'msgraph' && data.TenantID)
            lines.push('Tenant ID: ' + data.TenantID);
        if (data.Scope)
            lines.push('Scope: ' + data.Scope);
        if (data.AuthenticationType == 'facebook' && data.ProfileFieldList)
            lines.push('Profile Field List: ' + data.ProfileFieldList);
        if (data.AuthenticationType == 'dnn' && data.Tokens)
            lines.push('Tokens: ' + data.Tokens);
        if (data.AccessToken)
            lines.push('Access Token: ' + data.AccessToken);
        if (data.RefreshToken)
            lines.push('Refresh Token: ' + data.RefreshToken);

        return lines.join('\n');
    }

    function textToConfig(text) {
        var lines = text.split('\n'),
            map = {},
            pendingProp = null;
        for (i in lines) {
            var line = lines[i];
            if (line != '') {
                var j = line.indexOf(':');
                if (pendingProp != null) {
                    map[pendingProp] = line;
                    pendingProp = null;
                }
                else if (j > -1) {
                    var name = line.substring(0, j).replace(/ /g, ''),
                        val = line.substring(j + 1);
                    map[name] = val.trim();
                    if (val.trim() == '')
                        pendingProp = name;
                }
            }
        }
        map.RedirectUri = simplyUri(map.RedirectUri);
        map.LocalRedirectUri = simplyUri(map.LocalRedirectUri);
        return map;
    }

    function simplyUri(uri) {
        if (typeof uri == 'string') {
            var uriInfo = uri.match(/^(.+)?\/appservices\/saas\/\w+$/i);
            if (uriInfo)
                uri = uriInfo[1];
        }
        return uri;
    }
})();