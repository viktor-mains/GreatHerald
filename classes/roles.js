var Post = require('./post.js');

exports.Roles = function (member) {
    var roles = this;

    roles.data = null;
    roles.requestedManually = false;
    roles.getData = function (fetchedData) { roles.data = fetchedData; };
    
    roles.roleExists = function (roleName) {
        return member.guild.roles.exists(role => role.name.toLowerCase()===roleName.toLowerCase());
    };
    roles.returnRoleID = function (roleName) {
        var role = member.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
        return role.id;
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
            `You can be anything you want, I'm not giving you role outside the #assign_role room.`,
            `You already have the **[${roleName.toUpperCase()}]** role.`))
            return;

        var post = new Post.Post(roles.data);
        member.addRole(roles.returnRoleID(roleName))
            .then(success => {
                if (roles.requestedManually)
                    post.message(`**[${roleName.toUpperCase()}]** succesfully added to ${member.user.username}.`);
                console.log(`**[${roleName.toUpperCase()}]** succesfully added to ${member.user.username}.`);
            }).catch(error => {
                if (roles.requestedManually)
                    post.message(`Failed to assign the **[${roleName.toUpperCase()}]** role.`);
                console.log(error);
            });
        return;
    };
    roles.removeRoleFromUser = function (roleName) {
        if (roles.requestedManually && !roles.allRequirementsMet('remove', roleName,
            `That's great to hear, but go to <#${roles.data.roleChannel}> room if you want to have it removed.`,
            `You don't have the **[${roleName.toUpperCase()}]** role.`))
            return;

        var post = new Post.Post(roles.data);
        member.removeRole(roles.returnRoleID(roleName))
            .then(success => {
                if (roles.requestedManually)
                    post.message(`**[${roleName.toUpperCase()}]** succesfully removed from ${member.user.username}.`);
                console.log(`**[${roleName.toUpperCase()}]** succesfully removed from ${member.user.username}.`);
            }).catch(error => {
                if (roles.requestedManually)
                    post.message(`Failed to remove the **[${roleName.toUpperCase()}]** role.`);
                console.log(error);
            });
        return;
    };
    roles.allRequirementsMet = function (roleAction, roleName, wrongChatRoom, userHasOrHasNotRole) {
        var post = new Post.Post(roles.data);

        if (!roles.requestWasSendInApropriateChannel()) {
            post.message(wrongChatRoom);
            return false;
        }
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