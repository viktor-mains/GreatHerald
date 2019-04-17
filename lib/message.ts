import Discord from 'discord.js';

import dearViktor from '../data/dearviktor.json';
import commands from '../data/commands.json';
import reactions from '../data/reactions.json';

import { getKeyword } from './helpers';
import { 
    chooseRandom,
    happensWithAChanceOf,
} from './rng';
import { Command } from '../lib/commands/commands'

import { 
    IReaction, 
    IReactionDetails 
} from './types/reaction';
import { IDVKeywords } from './types/dearviktor';

// LOGIC

const isChannelDM = (msg:Discord.Message) => msg.author.id === msg.channel.id;
const isUserAdmin = (msg:Discord.Message) => msg.member.hasPermission('ADMINISTRATOR');
const isUserBot = (msg:Discord.Message) => msg.author.bot;
const isUserArcy = (msg:Discord.Message) => msg.author.id === '165962236009906176';
const messageStartsWithCommandSymbol = (msg:Discord.Message) => msg.content.startsWith(commands.options.commandSymbol);
const isMessageRant = (msg:Discord.Message) => msg.content === msg.content.toUpperCase() && msg.content.length > 20;
const isMessageDearViktor = (msg:Discord.Message) => msg.content.toLowerCase().startsWith('dear viktor');
const isMessageDearVictor = (msg:Discord.Message) => msg.content.toLowerCase().startsWith('dear victor');

const answer = (msg:Discord.Message, answer:string) => msg.channel.send(answer);
const answerDearViktor = (msg:Discord.Message) => {
    if (msg.content.endsWith('?')) {
        const keywordDetected = dearViktor.keywords.find(
            (category:any) => category.list.find(
                (keyword:string) => msg.content.toLowerCase().indexOf(keyword) !== -1)
            );
        keywordDetected
            ? answer(msg, chooseRandom(dearViktor.answers[keywordDetected.id]))
            : answer(msg, chooseRandom(dearViktor.answers.yesno))
        return;
    }
    answer(msg, '_That_ doesn\'t look like question to me.')
};
const answerDearVictor = (msg:Discord.Message) => answer(msg, '...what have you just call me. <:SilentlyJudging:288396957922361344>');
const answerCommand = (msg:Discord.Message) => {
    const command = commandObject(msg);
    command
        ? Command[getKeyword(msg)](command, msg)
        : msg.react(':questionmark:244535324737273857');
    
}
const checkForReactionKeywords = (msg:Discord.Message) => {
    const appropiateReactions = reactions.filter((reaction:any) => msg.content.indexOf(reaction.keyword) !== -1);
    if (appropiateReactions.length === 0)
        return;
    const chosenKeyword = chooseRandom(appropiateReactions);
    const chosenReaction = chosenKeyword.list.find((reaction:IReactionDetails) => happensWithAChanceOf(reaction.chance));
    if (chosenReaction)
        msg.react(chosenReaction.emoji);
};
const commandObject = (msg:Discord.Message) => commands.list.find(cmd => cmd.keyword === getKeyword(msg));

// MAIN FUNCTION

const classifyMessage = (msg:Discord.Message) => {
    if (isUserBot(msg)) {
        return;
    }
    if (isMessageDearViktor(msg)) {
        answerDearViktor(msg);
        return;
    }        
    if (isMessageDearVictor(msg)) {
        answerDearVictor(msg);
        return;
    }
    if (isChannelDM(msg) && !isUserArcy(msg)) {
        answer(msg, 'Only my glorious creator can talk to me in private.');
        return;
    }
    if (messageStartsWithCommandSymbol(msg)) {
        answerCommand(msg);
        return;
    }
    checkForReactionKeywords(msg);
}

export { classifyMessage, isUserAdmin };