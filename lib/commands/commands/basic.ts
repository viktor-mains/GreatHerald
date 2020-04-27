import Discord from 'discord.js';
import { cache } from '../../storage/cache';
import { isUserAdmin } from '../../message';
import { chooseRandom } from '../../rng';
import { extractNicknameAndServer, createEmbed, getCommandSymbol, splitArrayByObjectKey, } from '../../helpers';

type TField = {
    title: string,
    content: string
}

export const opgg = (msg:Discord.Message) => {
    const { nickname, server } = extractNicknameAndServer(msg);
    if (nickname && server)
        msg.channel.send(`https://${ server }.op.gg/summoner/userName=${ nickname }`)
}

export const help = (msg:Discord.Message) => {
    let fields = new Array<TField>();
    let commands = cache["commands"]
        .filter(command => command.isModOnly === false && command.description);
    commands = splitArrayByObjectKey(commands, 'category');

    for (let category in commands) {
        const title = `Category ${category.toUpperCase()}`;
        let content = '';
        commands[category].map(command => content += `- **${getCommandSymbol()}${command.keyword}** - ${command.description}\n`);
        fields.push({ title, content })
    }
        
    const embed = createEmbed('📜 List of commands', fields);
    msg.author.send({ embed })
        .then(() => msg.react('📩'))
        .catch(err =>
            msg.channel.send(createEmbed(':warning: I am unable to reply to you', [{ title: '\_\_\_', content: `This command sends the reply to your DM, and it seems you have DMs from members of this server disabled.
            \nTo be able to receive messages from me, go to \`\`User Settings => Privacy & Safety => Allow direct messages from server members\`\` and then resend the command.` }]
            ))
        );
}

export const hmod = (msg:Discord.Message) => {
    let fields = new Array<TField>();
    let commands = cache["commands"]
        .filter(command => command.isModOnly === true && command.description);
    commands = splitArrayByObjectKey(commands, 'category');

    for (let category in commands) {
        const title = `Category ${category.toUpperCase()}`;
        let content = '';
        commands[category].map(command => content += `\`\`-\`\`**${getCommandSymbol()}${command.keyword}** - ${command.description}\n`);
        fields.push({ title, content })
    }
        
    const embed = createEmbed('📜 List of moderator commands', fields);
    msg.author.send({ embed })
        .then(() => msg.react('📩'))
        .catch(err =>
            msg.channel.send(createEmbed(':warning: I am unable to reply to you', [{ title: '\_\_\_', content: `This command sends the reply to your DM, and it seems you have DMs from members of this server disabled.
            \nTo be able to receive messages from me, go to \`\`User Settings => Privacy & Safety => Allow direct messages from server members\`\` and then resend the command.` }]
            ))
        );
}

export const shutup = (msg:Discord.Message) => {
    let answer = '';
    if (isUserAdmin(msg)) {
        msg.channel.stopTyping();
        const answers = cache["options"].find(option => option.option === 'shutUpMod')
            ? cache["options"].find(option => option.option === 'shutUpMod').value
            : [];
        answer = chooseRandom(answers);
    }
    else {
        const answers = cache["options"].find(option => option.option === 'shutUpUser')
            ? cache["options"].find(option => option.option === 'shutUpUser').value
            : [];
        answer = chooseRandom(answers);
    }
    if(answer && answer !== '' && answer.length > 0)
        msg.channel.send(answer);
}