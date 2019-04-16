var Post = require('./post.js');

exports.Roles = function (member) {
    var roles = this;

    roles.data = null;
    roles.requestedManually = false;
    roles.getData = function (fetchedData) { roles.data = fetchedData; };
    
    roles.roleExists = function (roleName) {
        return member.guild.roles.exists(role => role.name.toLowerCase() === roleName.toLowerCase());
    };
    roles.returnRoleID = function (roleName) {
        var role = member.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase()).id;
        return role;
    };
    roles.userHasRole = function (roleName) {
        if (member.roles.has(roles.returnRoleID(roleName)))
            return true;
        return false;
    };
    roles.requestWasSendInApropriateChannel = function () {
        if (roles.data.roleChannel == roles.data.message.channel.id)
            return true;
        return false;
    };
    
    roles.addRoleToUser = function (roleName) {
        if (roles.requestedManually && !roles.allRequirementsMet('add', roleName,
            `You can be anything you want, I'm not giving you role outside the <#${roles.data.roleChannel}> room.`,
                `You already have the **[${roleName.toUpperCase()}]** role.`))
            return;

        var post = new Post.Post(roles.data);

        member.addRole(roles.returnRoleID(roleName))
            .then(success => {
                if (roles.requestedManually)
                    post.message(`Role **[${roleName.toUpperCase()}]** assigned to ${member.user.username} with utmost efficiency.`);
            }).catch(error => {
                if (roles.requestedManually)
                    post.message(`Failed to assign the **[${roleName.toUpperCase()}]** role.`);
                console.log(error);
            });
        return;
    };
    roles.removeRoleFromUser = function (roleName) {
        if (roles.requestedManually) {
            if (!roles.allRequirementsMet('remove', roleName,
                `That's great to hear, but go to <#${roles.data.roleChannel}> room if you want to have it removed.`,
                `You don't have the **[${roleName.toUpperCase()}]** role.`))
            return;
        }

        var post = new Post.Post(roles.data);
        member.removeRole(roles.returnRoleID(roleName))
            .then(success => {
                if (roles.requestedManually)
                    post.message(`**[${roleName.toUpperCase()}]** succesfully removed from ${member.user.username}.`);
            }).catch(error => {
                if (roles.requestedManually)
                    post.message(`Failed to remove the **[${roleName.toUpperCase()}]** role.`);
                console.log(error);
            });
        return;
    };
    roles.jokeRoleRequested = function (roleName) {
        var jokeRoles = [`bad`, `trash`, `boosted`, `noob`, `bonobo`];
        for (i in jokeRoles) {
            if (jokeRoles[i] == roleName.toLowerCase())
                return true;
        }
        return false;
    };
    roles.rankRoleRequested = function (roleName) {
        var arrayOfRanks = [`challenger`, `grandmaster`, `master`, `diamond`, `platinum`, `gold`, `silver`, `bronze`, `iron`];
        for (i in arrayOfRanks) {
            if (roleName.toLowerCase() == arrayOfRanks[i])
                return true;
        };
        return false;
    };
    roles.userSpecialRoleRequested = function (roleName) {
        var arrayOfUserRanks = [`Fresh Acolyte`, `Junior Assistant`, `Hextech Progenitor`, `Arcane Android`, `Artist`, `Winner of the 1v1 Tournament`];
        for (i in arrayOfUserRanks) {
            if (roleName.toLowerCase() == arrayOfUserRanks[i].toLowerCase())
                return true;
        };
        return false;
    };
    roles.modRoleRequested = function (roleName) {
        var arrayOfUserRanks = [`Superior Construct`, `Admin`, `Administrator`, `Administrators`, `Mod`, `Moderator`, `Moderators`, `Experimental AI`, `Reddit Moderator`, `Reddit Moderators`];
        for (i in arrayOfUserRanks) {
            if (roleName.toLowerCase() == arrayOfUserRanks[i].toLowerCase())
                return true;
        };
        return false;
    }

    roles.allRequirementsMet = function (roleAction, roleName, wrongChatRoom, userHasOrHasNotRole) {
        var post = new Post.Post(roles.data);

        if (!roles.requestWasSendInApropriateChannel()) {
            post.message(wrongChatRoom);
            return false;
        }
        if (roles.jokeRoleRequested(roleName) && roleAction==`add`)
            return post.message(`Indeed. You are.`);
        if (roles.rankRoleRequested(roleName) && roleAction==`add`)
            return post.embed(`:information_source: This is not how rank roles are assigned`, [[`___`, `Rank roles are assigned manually by moderators.\n\n` +
                `1. **Screenshot your profile** with nickname and rank badge visible, like that: http://i.imgur.com/aiRJudZ.png \n` +
                `2. Post the screenshot in the #bot_commands room. \n\n` +
                `The colour will be based off *Ranked Solo/Duo* - Ranked Flex and Ranked 3v3 aren't taken into account.`, false]]);
        if (roles.userSpecialRoleRequested(roleName))
            return post.message(`:warning: This role can't be added neither removed manually.`);
        if (roles.modRoleRequested(roleName))
            return post.message(`:warning: Heh. You'd like to. But nope.`);
        if (!roles.roleExists(roleName)) {
            post.message(`Such role doesn't exist.`);
            return false;
        }
        if (!roles.userHasRole(roleName) && roleAction==`remove`) {
            post.message(userHasOrHasNotRole);
            return false;
        }
        if (roles.userHasRole(roleName) && roleAction == `add`) {
            post.message(userHasOrHasNotRole);
            return false;
        }
        return true;
    };
};