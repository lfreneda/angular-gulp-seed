(function () {
    'use strict';
    angular.module('blocks.auth')
        .factory('authenticatedUser', function ($localStorage, $) {

            var profileKey = 'k';
            var profile = getProfile();

            return {
                profile: profile,
                setProfile: setProfile,
                logout: logout,
                storageKey: storageKey
            };

            function storageKey(keyName) {
                return profile.id + '_' + keyName;
            }

            function logout() {

                profile.id = '';
                profile.name = '';
                profile.email = '';
                profile.token = '';
                profile.loginCount = 0;

                $localStorage.remove(profileKey);
            }

            function setProfile(userProfile) {
                profile.id = userProfile.id;
                profile.name = userProfile.name;
                profile.email = userProfile.email;
                profile.token = userProfile.token;
                profile.loginCount = userProfile.loginCount;

                $localStorage.setObject(profileKey, profile);
            }

            function getProfile() {

                profile = { id: '', name: '', email: '', token: '' };

                var savedProfile = $localStorage.getObject(profileKey);
                if (savedProfile) {
                    profile.id = savedProfile.id;
                    profile.name = savedProfile.name;
                    profile.email = savedProfile.email;
                    profile.token = savedProfile.token;
                    profile.loginCount = savedProfile.loginCount;
                }

                return profile;
            }
        });
})();
