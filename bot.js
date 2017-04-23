var Discord = require('discord.io');
var RITO_KEY=process.env.RITO_KEY;

var server_id="207732593733402624"; //server's id
var log_id="303638628486086657"; //log rom id
var flair_id="268354627781656577"; //flair room id

var version="The Great Herald beta 1.26: Live Game Data";

var bot = new Discord.Client({
    autorun: true,
    token: process.env.API_KEY
});

//--------------------------------//
//.............EVENTS.............//
//--------------------------------//
bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
	bot.setPresence({
		idle_since: null,
		game: {
			name: "Glorious Evolution - !h for help!"
		}
	});
});
bot.on('disconnect', function(errMsg, code) {	
	console.log('Failure detected: '+code+' - '+errMsg);
	bot.setPresence({
		idle_since: null,
		game: {
			name: "crashed halp pls"
		}
	});
});
bot.on('any', function(event) {
	/*
	var type=event.t;
	var ignored=["MESSAGE_CREATE", "PRESENCE_UPDATE", "GUILD_CREATE", "GUILD_DELETE", "GUILD_ROLE_CREATE", "GUILD_ROLE_UPDATE", "GUILD_ROLE_DELETE", "CHANNEL_CREATE", "CHANNEL_UPDATE", "CHANNEL_DELETE",
		"VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE", "GUILD_MEMBERS_CHUNK", "TYPING_START"];
	var toIgnore=false;
	for (var i in ignored)
	{
		if (type==ignored[i])
			toIgnore=true;
	}
	if (!toIgnore)	
	{
		var theLog="";
		var title="";
		switch (type)
		{
			case "MESSAGE_UPDATE":
			{
				//console.log(event);
				title="LOG - message edited"
				theLog="**"+event.d.author.username + "** - "+event.d.content ;
				break;
			}
			default:
			{
				//console.log(event);
				//title="???"
				//theLog="???";
				break;
			}
		}
		sendEmbed(log_id, title, theLog);
	}
	
	if (event.t=="MESSAGE_DELETE")
	{
		//if (event.d.content)
		{
			console.log(event);
			try
			{
				sendEmbed(log_id, "LOG - user edits message",
								"\n**Author** - "+event.d.author.username+"#"+event.d.author.discriminator+
								"\n**Deleted message** - "+event.d.content+
								"\n**Channel**     - <#"+event.d.channel_id+">"+
								"\n**Timestamp**   - "+event.d.timestamp);	
			}
			catch (err)
			{
				send(log_id, err + " - error while acquiring _deleted_ message data.");
			}
		}
	}*/
});
bot.on('messageUpdate', function(oldMsg, newMsg) {
	if (true)
	{
		if (newMsg.edited_timestamp!=undefined)
		{
			try
			{
				sendEmbed(log_id, "LOG - user edits message",
								"\n**Author** - "+oldMsg.author.username+"#"+oldMsg.author.discriminator+
								"\n**Old message** - "+oldMsg.content+
								"\n**New message** - "+newMsg.content+
								"\n**Channel**     - <#"+newMsg.channel_id+">"+
								"\n**Timestamp**   - "+newMsg.edited_timestamp);	
			}
			catch (err)
			{
				send(log_id, err + " - error while acquiring _edited_ message data.");
			}
		}
	}
});
bot.on('presence', function(user, userID, status, game, event) {
	//console.log(event);
	add_streaming_role(user, userID, status, game, event);
});
bot.on('guildMemberAdd', function(member, event) {
	if (event.d.guild_id==server_id)
	{
		send(event.d.user.id, "Greetings newcomer! We're glad you've decided to join the Evolution. To make your first steps here easier, I'll equip you with a few useful tips; I would also wish for you to glance over our **rules**.\n\n"+
		"**Viktor Bot** is our custom bot and his commands might differ from other bots. Write !h or !help for more info.\n\n"+
		"**Useful links for newcomers:**\n"+
		"- _frequently asked questions_ - https://www.reddit.com/r/viktormains/wiki/faq\n\n"+
		"- _Viktor in-game clubs_ - https://www.reddit.com/r/viktormains/wiki/clubs\n"+
		"- _Viktor streams/guides/fanarts_ - https://www.reddit.com/r/viktormains/wiki/content\n"+
		"**Rules:**\n"+
		"1. Treat everyone with respect. Cursing is allowed as long as it is not directed towards other members of the discord in an offensive manner.\n"+
		"2. Please keep any saltiness in the designated room: #salt_mine.\n"+
		"3. Keep conversations not related to Viktor or League of Legends in #off_topic.\n"+
		"4. No racism not hate speech.\n"+
		"5. No NSFW - aka any pictures that include nudity or extreme gore.\n"+
		"6. No spam. Memes in healthy dose please.\n\n"+
		"Moderators reserve the right to kick/bans users basing on judgement calls."
		);

		var m=''; 
		m=event.d.user.username+" just joined the Evolution. Welcome!";
		/*switch(Math.floor((Math.random() * 10) + 1)) //welcomes new user
		{
			case 1:
				m="Greetings, "+event.d.user.username+"! Glad to see you here.";
			case 2:
				m="Seems that "+event.d.user.username+" just joined the Evolution. Greet them like they deserve.";
			case 3:
				m="Greetings, "+event.d.user.username+". You've come to the right place.";
			case 4:
				m="Why hello there, "+event.d.user.username+". Make yourself in home.";
			case 5:
				m="";
			case 6:
				m="Pity, they _really_  needed to upgrade some parts of themselves.";
			case 7:
				m="For the better, they weren't able to fully embrace the Evolution.";
			case 8:
				m="Pity, who will clean the toilets now?";
			case 9:
				m="Weird choice, but who I am to judge.";
			case 10:
			default:
				m="Almost as if they didn't want to improve all those abundant flaws of theirs.";
		}*/
		send("290601371370127361", m);  //#ASSIGN_FLAIR ROOM - WARNING: HARDCODED!!!
		sendEmbed(log_id, "LOG - user joins server", "**New user** - "+event.d.user.username);
	}
});
bot.on('guildMemberRemove', function(member, event) {
	if (event.d.guild_id==server_id)
	{
		var m='';
		switch(Math.floor((Math.random() * 10) + 1)) //bids proper farewell to leaving user
		{
			case 1:
				m="Seems that not everyone is able to endure the tough process of evolving oneself.";
				break;
			case 2:
				m="Probably requalified as a dirty Yasuo main. _Ew_.";
				break;
			case 3:
				m="Not that I had any hopes tied to them anyway.";
				break;
			case 4:
				m="Not a big loss, though.";
				break;
			case 5:
				m="One annoying human in my close proximity less.";
				break;
			case 6:
				m="Pity, they _really_  needed to upgrade some parts of themselves.";
				break;
			case 7:
				m="Well, bettering oneself is not to everyone.";
				break;
			case 8:
				m="Pity, who will clean the toilets now?";
				break;
			case 9:
				m="Weird choice, but who I am to judge.";
				break;
			case 10:
			default:
				m="Almost as if they didn't want to improve all those abundant flaws of theirs.";
				break;
		}
		send("290601371370127361", event.d.user.username+" left the server. "+m); //#BOT_SPAM ROOM - WARNING: HARDCODED!!!
		sendEmbed(log_id, "LOG - user leaves server", "**Leaver** - "+event.d.user.username);
	}
});
bot.on('message', function(user, userID, channelID, message, rawEvent) {
	var m=message;	
	
	if (userID!="276781276898525184") //STOPS BOT FROM RESPONDING TO HIMSELF
	{
		if (m.startsWith("%"))
		{
			console.log(channelID);
			if (channelID=="278186932029095937") //warning: this is different than the bot's ID
			{
				if (userID=="165962236009906176")
					send("247501730336604163", m.slice(1).trim());  //little trolling with DM's
			}
		}
		else if (m.startsWith('!'))
		{
			if (m.startsWith("!iam") && !(m.startsWith("!iamnot"))) 
			{
				if (channelID==flair_id) //ASSIGN COMMANDS - ONLY IN #ASSIGN_FLAIR ROOM
					add_role(m, userID, channelID);
				else
					send(channelID,"You can be anything you want, I'm not giving you any flair outside of the <#"+flair_id+"> room.");
			}
			else if (m.startsWith("!iamnot")) 
			{
				if (channelID==flair_id) //ASSIGN COMMANDS - ONLY IN #ASSIGN_FLAIR ROOM
					remove_role(m, userID, channelID);
				else
					send(channelID, "That's great to hear, but go to <#"+flair_id+"> room if you want to have it removed.");
			}
			else if (m=="!commands" || m=="!help" || m=="!h")
			send(userID, "\n**"+version+"**\n\nCommand list:\n"+
					"```Viktor gameplay questions - !build | !matchup <champion_name> | !faq\n"+
					"Clubs                     - !clubs\n"+
					"Streams                   - !dun\n\n"+
					"Live game data            - !ingame <ign>|<server> (example: !iname arcyvilk|euw)\n"+
					"OP.gg  				   - !opgg <ign>|<server> (example: !opgg arcyvilk|euw)\n"+
					"Mastery points 		   - !mastery <ign>|<server> (example: !mastery arcyvilk|euw)\n"+
					"Ranked races              - !silverrace | !goldrace | !platinumrace | !diamondrace | !masterrace\n\n"+
					"Talking with Viktor bot   - dear viktor <text> ? | hello | notice me senpai | !beep\n"+
					"Random pet photo          - !meow | !woof```\n"+
					"Server, rank and stream roles - visit <#268354627781656577> room for more info.\n\n"+
					"In case of any bugs occuring, contact Arcyvilk#5460.");
			else if (m.startsWith("!masterrace"))
				return race(channelID, user, m, "Master", "Diamond");
			else if (m.startsWith("!diamondrace"))
				return race(channelID, user, m, "Diamond", "Platinum");
			else if (m.startsWith("!platinumrace"))
				return race(channelID, user, m, "Platinum", "Gold");
			else if (m.startsWith("!goldrace"))
				return race(channelID, user, m, "Gold", "Silver");
			else if (m.startsWith("!silverrace"))
				return race(channelID, user, m, "Silver", "Bronze");	
			else if (m.startsWith("!mastery"))
				return mastery(channelID, m);
			else if (m.startsWith("!ingame"))
				return ingame(channelID, m);
			else
			{
				var c=commands(channelID, m, user, userID);
				if (c!=0)
				{
					console.log(c);
					if (m!="!meow" && m!="!woof") //THOSE TWO ARE SPECIAL CASES AND SEND FROM THE BODY OF FUNCTION
					{
						if (c[1]==null) //NO EMBEDS
						{
						try
							{	send(channelID, botrefuses(c[0], "I refuse to execute your petty command."));	}
							catch (err)
							{	send(channelID, "I refuse to execute your petty command.\n"+err);	}
						}
						else //YES EMBEDS
						{
							try
							{	sendEmbed(channelID, c[1], c[0]);	}
							catch (err)
							{	send(channelID, "I refuse to execute your petty command.\n"+err);	}
						}
					}
				}
			}
		}
		else if (answers(m)!=0)
		{
			try
			{	send(channelID, answers(m));}
			catch(err)
			{}
		}
		else if (m.toLowerCase().startsWith("dear viktor"))
			send(channelID, viktor_answers(m));
		else if (m.length>=20 && m===m.toUpperCase()) //allcaps
		{
			var rand=Math.floor((Math.random() * 10) + 1); 
				if (rand<5)
					react(channelID, rawEvent.d.id, "🍿");
				else if (rand==5)
					react(channelID, rawEvent.d.id, ":ahaok:288392049873518602");
		}
	}
});

function send(cid, m)
{
	bot.sendMessage({
		to: cid,
		message: m});
}
function sendEmbed(cid, tid, m)
{
	bot.sendMessage({
		to: cid,
        embed: {color: 0xfdc000, title: tid, description: m}
		});
}
function react(cid, mid, rid)
{
	bot.addReaction({
		channelID: cid,
		messageID: mid,
		reaction: rid
		});
}

//------------------------------------------//
//.............CUSTOM RESPONSES.............//
//------------------------------------------//

function viktor_answers(m)
{
	if (!m.endsWith("?"))
	{
		return "_That_ doesn't look like a question to me.";
	}
	else
	{
		if (m.toLowerCase().indexOf("arcyvilk")!=-1 || m.toLowerCase().indexOf("arcy")!=-1 || m.toLowerCase().indexOf("your creator")!=-1 || m.toLowerCase().indexOf("your maker")!=-1 ||
				 m.toLowerCase().indexOf("person who made you")!=-1 || m.toLowerCase().indexOf("man who made you")!=-1 || m.toLowerCase().indexOf("guy who made you")!=-1)
		{
			var arrayOfArcyanswers=["", "You mean Arcy? That's, like, the single best person in existence.",
										"I'm sorry, I can't hear you over my creator's pure _awesomeness_.",
										"Arcy is the best and I agree with them on everything."];
			return arrayOfArcyanswers[Math.floor((Math.random() * (arrayOfArcyanswers.length-1)) + 1)];
		}
		var arrayOfAnswers=["", "No. Leave me alone.",
								"_shakes head with disapproval_",
								"I have no time for your senseless questions.",
								"...and why would you ask _me_ that?",
								"I don't see such possibility, unfortunately.",
								"Don't you see that I am busy?",
								"Are you incapable of figuring it out yourself?",
								"Is it possible? Surely, as long as you are not involved.",
								"I couldn't agree more.",
								"Yes, definitely. Why didn't I think about it myself?",
								"Don't you have anything better to do besides bothering me with your dumb questions?",
								"Doubtful. Very. Doubtful. Very, very, _very_  doubtful.",
								"No, at least not in this particular spacetime.",
								"I see no reason for it not to happen.",
								"If only you weren't so annoying; then _maybe_.",
								"_stares silently, clearly unamused_",
								"<:vikwat:269523937669545987> _...what._",
								"http://i.imgur.com/ftlyPXx.png",
								"I would suggest stop wasting your time asking questions and actually do something creative instead.",
								"_sighs_ yes. Yes, I guess so.",
								"Well, I _kind of_  see some potential in that.",
								"I am not sure how do you imagine that to happen.",
								"I am a scientist, not a fortune teller.",
								"You just need to get good.",
								"Adapt, or be removed.",
								"...I refuse to answer this question.",
								"Hm, there's certainly an area to improvement.",
								"I won't deny, but I also won't confirm.",
								"This query makes me question your sanity.",
								"Hypothetically, everything is possible.",
								"Oh. So you actually _are_  able to have a good idea once in a while!",
								"Heh. So _naive_.",
								"...this... Actually... Might be true. Perhaps.",
								"If this ever happens, what I hope will not, it just _has_ to end with a disaster.",
								"It's actually not _that_  bad of an idea...",
								"I hope it will never happen in my close proximity.",
								"My prognosis are rather... pessimistic.",
								"I am entirely sure this is doomed to fail in an instant it happens. If it ever does. What I highly doubt, by the way.",
								"The chance for it to happen equals to about 0.00019%, according to my calculations.",
								"_grunting noises_\nStop bothering me ;-;"]
			return arrayOfAnswers[(Math.floor((Math.random() * (arrayOfAnswers.length-1)) + 1))];
	}
}
function commands(cid, m, u, uid) //COMMANDS STARTING WITH "!"
{	
	m=m.toLowerCase();
	
	if (m=="!beep")
		return ["_sighs deeply_ \nBeep. Boop." , null];	
	else if (m=="!build")
		return["○ **First back:**\n\n"+
			"> 1250 g: <:hc1:242831892427177995> + <:potion:277494945332592640>\n"+
			"< 1250 g: <:doran:277494945261027328> + <:potion:277494945332592640> / <:darkseal:298575845977620502> + <:potion:277494945332592640>\n"+
			"< 1250 g vs LB, Kata, Syndra etc: <:negatron:277494945432993792> + <:potion:277494945332592640>"+
			"\n____________\n\n"+
			"○ **Default build:**\n\n <:hc1:242831892427177995> → <:sheen:277494945500233728>/<:hc2:242831893051998218> → "+
			"<:sheen:277494945500233728>/<:hc2:242831893051998218> → <:hc3:242831893509308416> → <:lichbane:242831894134128650> → "+
			"<:rabadon:242831892854865922>/<:voidstaff:242831893899247616> → <:rabadon:242831892854865922>/<:voidstaff:242831893899247616> → "+
			"<:zhonya:242831893953773569>/<:abyssal:242831892334903296>/<:ga:273939560130674691>\n"+
			"\n\n○ **New experimental build:**\n\n <:hc1:242831892427177995> → <:morello:298575846464159754> → <:liandry:298576316108767232> → "+
			"<:voidstaff:242831893899247616> → <:zhonya:242831893953773569>/<:rabadon:242831892854865922> (<:hc3:242831893509308416> somewhere inbetween)" , "**♥ GLORIOUS MINIGUIDE TO BUILD ♥**"];
	else if (m=="!clubs")
		return ["https://www.reddit.com/r/viktormains/wiki/clubs - the list of NA/EUW/EUNE in-game clubs we know about.",null];
	else if (m=="!dun")
		return ["- OP.gg - https://na.op.gg/summoner/userName=dunv2\n"+
				"- Stream - http://twitch.tv/dunlol","Dun, Challenger Viktor main"];
	else if (m=="!faq")
		return ["Useful tips and tricks for new Viktor players: https://www.reddit.com/r/viktormains/wiki/faq",null];
	else if (m=="!joke")
		return ["I won't waste my precious time for the sake of your personal amusement.",null];
	else if (m.startsWith('!opgg'))
	{
		try
		{
			if (m.indexOf('|')==-1)
				return ["This command requires the symbol \"**|**\" to separate region from nickname. \n_Example:_ !opgg euw**|**"+u,null];
			else
			{
				var p=(((m.slice(5)).trim()).replace(/ /g,"+")).split('|');
				return [botrefuses("https://"+p[1]+".op.gg/summoner/userName="+(p[0]), "I don't think you want to show _that_  to everyone."),null];
			}
		}
		catch(err)
		{
			return ["I failed to retrieve the desired data, though, it probably wasn't anything interesting anyway.",null];
		}
	}
	else if ((m.toLowerCase()).startsWith('!matchup')) //MATCHUP COMMANDS
		return [matchup(((m.slice(8)).trim()).toLowerCase()), null];
	else if (m.startsWith("!rank")) {} //IMPLEMENT		
	else if (m=="!roles")
		return [	"- servers: BR | EUW | EUNE | NA | JP | Garena | KR | LAN | LAS | OCE | RU | TR\n"+
					"- are you a Viktor streamer? Type !iam Viktor Streamer\n","**Self-assignable roles:**"];
	else if (m=="!test")
		return ["I am a tester version of myself.",null];
	else if (m=="!version")
		return [version,null];
	
	//SPECIALCASES
	
	else if (m=="!meow") 
	{
		try
		{
			return_api("http://random.cat/meow", function(api){
				if (api!="error")
					send(cid, botrefuses((JSON.parse(api)).file + " :cat: :3", "You have been given an opportunity to ask me, an evolved being, for anything; and you ask for a cat photo. _Really?_"));
				else 
					send(cid, "Can't get a cat.");
			});
		}
		catch(err)
		{	send(cid,"You have been given an opportunity to ask me, an evolved being, for anything; and you ask for a cat photo. _Really?_\n"+err);}
	}
	else if (m=="!woof")
	{
		try
		{
			return_api("http://random.dog/woof", function(api){
				if (api!="error")
					send(cid, botrefuses("http://random.dog/"+api + " :dog: :3", "You have been given an opportunity to ask me, an evolved being, for anything; and you ask for a puppy photo. _Really?_"));
				else
					send(cid, "Can't get a dog.");
			});
		}
		catch(err)
		{	send(cid, "You have been given an opportunity to ask me, an evolved being, for anything; and you ask for a puppy photo. _Really?_\n"+err);}
	}
	else return 0;
}
function answers(m) //ANSWERS FIND RANDOM WORDS IN SENTENCES AND REACT TO THEM
{
	m=m.toLowerCase();
	if ((m.indexOf("notice me")!=-1) && m.indexOf("senpai")!=-1)	
		return "_looks away, unamused_";
	else if	(m.indexOf("ily")!=-1 && m.indexOf("viktor")!=-1)	
		var rand=Math.floor((Math.random() * 5) + 1);
		if (rand==5)
			return "http://i.imgur.com/yuXRObM.png";
	else if (m.indexOf("expirence")!=-1)
		return "_**e x p e r i e n c e**_ <:JustDieAlready:288399448176853012>";
	else if (m.indexOf("hello")!=-1)
		var rand=Math.floor((Math.random() * 2) + 1);
		if (rand==2)
			return "Greetings, inferior construct!";
	else if (m.indexOf(":questionmark:")!=-1)
	{	
		var rand=Math.floor((Math.random() * 2) + 1);
		if (rand==2)
			return "<:questionmark:244535324737273857>";
	}
	else if (m.indexOf("shrug")!=-1)
		var rand=Math.floor((Math.random() * 2) + 1);
		if (rand==2)
			return "¯\\\\_ <:viktor:232941841815830536> \\_/¯";
	else if (m.indexOf("build")!=-1 && (m.indexOf("viktor")!=-1 || m.indexOf("vik")!=-1))
		return "It's highly adviced to check the !build command.";
	else if ((m.indexOf("club")!=-1 || m.indexOf("clubs")!=-1) && (m.indexOf("viktor")!=-1 || m.indexOf("vik")!=-1))
		return "https://www.reddit.com/r/viktormains/wiki/clubs - the list of NA/EUW/EUNE in-game clubs we know about.";
	else return 0;
}
function matchup(m) //MATCHUPS ARE... WELL, MATCHUPS
{
	var champ=m.toLowerCase();
	switch (champ)
	{
		case "ahri":
			return "https://www.reddit.com/r/viktormains/comments/4jz0os/weekly_matchup_discussion_1_viktor_vs_ahri/ - patch 6.10";
		case "anivia":
			return "https://www.reddit.com/r/viktormains/comments/577drz/weekly_matchup_discussion_13_viktor_vs_anivia/ - patch 6.20";
		case "annie":
			return "https://www.reddit.com/r/viktormains/comments/5z1tsn/weekly_matchup_discussion_27_viktor_vs_annie/ - patch 7.5";
		case "aurelion":
		case "aurelion sol":
		case "asol":
		case "ao shin":
		case "aoshin":
		case "space dragon":
			return "https://www.reddit.com/r/viktormains/comments/64hgp7/weekly_matchup_discussion_30_viktor_vs_aurelion/ - patch 7.7";
		case "azir":
			return "https://www.reddit.com/r/viktormains/comments/4n9zim/weekly_matchup_discussion_4_viktor_vs_azir/ - patch 6.11";
		case "brand":
			return "https://www.reddit.com/r/viktormains/comments/5age0w/weekly_matchup_discussion_15_viktor_vs_brand/ - patch 6.21";
		case "cassiopeia":
			return "https://www.reddit.com/r/viktormains/comments/58vglf/weekly_matchup_discussion_14_viktor_vs_cassiopeia/ - patch 6.21";
		case "corki":
			return "https://www.reddit.com/r/viktormains/comments/5wyrzo/weekly_matchup_discussion_26_viktor_vs_corki/ - patch 7.4";
		case "ekko":
			return "https://www.reddit.com/r/viktormains/comments/5ghrj9/weekly_matchup_discussion_18_viktor_vs_ekko/ - patch 6.23";
		case "fizz":
			return "https://www.reddit.com/r/viktormains/comments/5hzr7p/weekly_matchup_discussion_19_viktor_vs_fizz/ - patch 6.24";
		case "gangplank": 
		case "gp":
			return "https://www.reddit.com/r/viktormains/comments/5qvxtj/weekly_matchup_discussion_23_viktor_vs_gangplank/ - patch 7.2";
		case "katarina":
		case "kata":
			return "https://www.reddit.com/r/viktormains/comments/5uzaqu/weekly_matchup_discussion_25_viktor_vs_katarina_2/ - patch 7.3";
		case "leblanc": 
		case "lb":
			return "https://www.reddit.com/r/viktormains/comments/5o0qs8/weekly_matchup_discussion_21_viktor_vs_leblanc/ - patch 7.1";
		case "lux":
			return "https://www.reddit.com/r/viktormains/comments/4slxkv/weekly_matchup_discussion_8_viktor_vs_lux/ - patch 6.13";
		case "orianna":
			return "https://www.reddit.com/r/viktormains/comments/51bu9v/weekly_matchup_discussion_11_viktor_vs_orianna/ - patch 6.17";
		case "ryze": 
			return "https://www.reddit.com/r/viktormains/comments/5jb7li/weekly_matchup_discussion_20_viktor_vs_ryze/ - patch 6.24";
		case "syndra":
			return "https://www.reddit.com/r/viktormains/comments/4vi9nw/weekly_matchup_discussion_9_viktor_vs_syndra/ - patch 6.15";
		case "taliyah":
			return "https://www.reddit.com/r/viktormains/comments/5pmxq6/weekly_matchup_discussion_21_viktor_vs_taliyah/ - patch 7.1";
		case "talon":
			return "https://www.reddit.com/r/viktormains/comments/5srelp/weekly_matchup_discussion_24_viktor_vs_talon/ - patch 7.2";
		case "twistedfate": 
		case "tf":
		case "twisted fate":
			return "https://www.reddit.com/r/viktormains/comments/4oes5m/weekly_matchup_discussion_5_viktor_vs_twisted_fate/ - patch 6.12";
		case "veigar": 
			return "https://www.reddit.com/r/viktormains/comments/5bmlxc/weekly_matchup_discussion_16_viktor_vs_veigar/ - patch 6.21";
		case "velkoz":
		case "vk":
		case "vel'koz":
			return "https://www.reddit.com/r/viktormains/comments/53vaa6/weekly_matchup_discussion_12_viktor_vs_velkoz/ - patch 6.17";
		case "xerath":
			return "https://www.reddit.com/r/viktormains/comments/61nzof/weekly_matchup_discussion_29_viktor_vs_xerath/ - patch 7.6.";
		case "yasuo":
			return "https://www.reddit.com/r/viktormains/comments/4m9ydy/weekly_matchup_discussion_3_viktor_vs_yasuo/ - patch 6.11";
		case "zed":
			return "https://www.reddit.com/r/viktormains/comments/4rc76d/weekly_matchup_discussion_7_viktor_vs_zed/ - patch 6.13";
		case "ziggs":
			return "https://www.reddit.com/r/viktormains/comments/60flq2/weekly_matchup_discussion_28_viktor_vs_ziggs/ - patch 7.5";
		case "zyra":
			return "https://www.reddit.com/r/viktormains/comments/4q0r3f/weekly_matchup_discussion_6_viktor_vs_zyra/ - patch 6.12";	
		case "asshole":
			return "Unfortunately, we do not have a matchup discussion for Jayce yet. Sorry for inconvenience!";
		default:
			return "Code name ["+ champ.toUpperCase() +"]: missing data. This matchup hasn\'t been discussed yet, it seems.";
	}
}
function mastery(cid,m)
{
	m=m.slice(8).trim().toLowerCase();
	if (m.indexOf("|")!=-1)
	{
		var p=m.split("|"); // 0=ign, 1=serv
		p[0]=((p[0].toLowerCase()).replace(/ /g,""));
		return_api("https://"+endpoints(p[1])+".api.riotgames.com/lol/summoner/v3/summoners/by-name/"+encodeURIComponent(p[0])+"?api_key="+RITO_KEY, function(pid) { 
			if (pid.startsWith("error"))
				send(cid, ":warning: Such player doesn't exist.");
			else
			{
				var player=(JSON.parse(pid)).id;
				return_api ("https://"+p[1]+".api.riotgames.com/championmastery/location/"+endpoints(p[1])+"/player/"+player+"/champion/112?api_key="+RITO_KEY, function(mid) {
					if (mid.startsWith("error"))
						send(cid, "The linked person didn't play a single game of me. _Phew_.");
					else
					{
						var mastery=JSON.parse(mid);
						var level=mastery.championLevel;
						var points=mastery.championPoints;						
						var chest=mastery.chestGranted;						
						var comment="";
							if (!chest) comment="...how the hell you don't have a chest yet? <:vikwat:269523937669545987>";
							if (level<=4) comment="...only level "+level+"? Come on. You need to step up your game.";
							if (points>="500000") comment="Your dedication... is admirable.";
							if (points>="1000000") comment="You're amongst the most loyal acolytes. You deserve a cookie. :cookie:";
							if (points>="100000" && level<6) comment="Over 100k points and yet, still no level 7. _sighs heavily_";
						
						if (chest==true)
							chest=":white_check_mark:";
						else chest=":negative_squared_cross_mark:";
						
						var summary="\n**Level**: "+getLevel(level)+
									"\n**Points**: "+points+
									"\n**Chest**: "+chest+
									"\n\n"+comment;						
						sendEmbed(cid, "<:viktorgod:269479031009837056> Viktor mastery points for "+p[0].toUpperCase(), summary);
					}
				});
			}
		});
	}
	else
		send(cid, "Incorrect input. It needs to be ``!mastery <ign>|<server>``");
}
function ingame(cid,m)
{
	send(cid, ":hourglass_flowing_sand: Getting the Live Game data. This might take a while...");
	m=m.slice(7).trim().toLowerCase();
	if (m.indexOf("|")!=-1)
	{
		var p=m.split("|"); // 0=ign, 1=serv
		p[0]=(p[0].toLowerCase()).replace(/ /g,"");
		return_api("https://"+endpoints(p[1])+".api.riotgames.com/lol/summoner/v3/summoners/by-name/"+encodeURIComponent(p[0])+"?api_key="+RITO_KEY, function(pid) { 
			if (pid.startsWith("error"))
				send(cid, ":warning: Such player doesn't exist.");
			else
			{
				var player=(JSON.parse(pid)).id;
				return_api("https://"+endpoints(p[1])+".api.riotgames.com/lol/spectator/v3/active-games/by-summoner/"+player+"?api_key="+RITO_KEY, function(mid) {
					if (mid.startsWith("error"))
						send(cid, ":x: This person either is not in game, or you did something wrong.");
					else
					{
						var game=JSON.parse(mid);
						return_api("https://"+endpoints(p[1])+".api.riotgames.com/lol/static-data/v3/champions?dataById=true&api_key="+RITO_KEY, function(chid) {
							if (chid.startsWith("error"))
								send(cid, ":x: Error retrieving champion data.");
							else
							{
								var ids="";
								for (var i=0;i<game.participants.length; i++)
									ids+=","+game.participants[i].summonerId;
								return_api("https://"+p[1]+".api.riotgames.com/api/lol/"+p[1]+"/v2.5/league/by-summoner/"+ids.slice(1)+"/entry?api_key="+RITO_KEY, function(rid){
									if (rid.startsWith("error"))
										send(cid, ":x: Error retrieving ranks data.");
									else
									{
										var champs=JSON.parse(chid);
										var ranks=JSON.parse(rid);
										var m="\n\n";
										var temp="";
										var teams=new Array(["",""],["",""],["",""],["",""],["",""],["",""]);
										for (var i=0; i<=game.participants.length; i++)
										{
											if (i==game.participants.length)
											{
												for (var j=0; j<teams.length; j++)
												{
													for (var k=0; k<2; k++)
														m+=teams[j][k];
												}
												send(cid, ":game_die: **Live game of "+p[0].toUpperCase()+" | "+game.gameMode + gamemodes(game.gameQueueConfigId)+"**"+m);
											}
											else
											{
												var nick=game.participants[i].summonerName.toUpperCase().trim().replace(/ /g,"");
												var rank="--";
												if (ranks[game.participants[i].summonerId]!=undefined)
													rank=ranks[game.participants[i].summonerId][0].tier.substring(0,1)+romanToInt(ranks[game.participants[i].summonerId][0].entries[0].division);
												temp="";
												if (game.participants[i].teamId%200!=0)//blue
												{
													temp+=nick + " ("+champs.data[game.participants[i].championId].name+")";
													if (nick.toLowerCase().trim()==p[0].toLowerCase().trim())
														temp+=" ◄";
													temp+="``";
													while(temp.length<=34)
														temp="."+temp;	
													temp="``["+rank+"]"+temp+":large_blue_circle:";
												}
												else
												{
													temp+="("+champs.data[game.participants[i].championId].name+") "+nick;
													if (nick.toLowerCase().trim()==p[0].toLowerCase().trim())
														temp="► "+temp;
													temp="``"+temp;
													while(temp.length<=34)
														temp+=".";
													temp=":red_circle: "+temp+"["+rank+"]``\n";	
												}
												teams[i%5][(game.participants[i].teamId-100)/100]=temp;
											}
										}
									}
								});
							}
						});
					}
				});
			}
		});
	}
	else
		send(cid, "Incorrect input. It needs to be ``!ingame <ign>|<server>``");
}
function botrefuses(normal, refusal)
{
	var rand=Math.floor((Math.random() * 100) + 1); 
	if (rand<2)
		return refusal;
	return normal;
}

//-----------------------------------------------------//
//.............ROLES, RACES, OTHER ASSIGNS.............//
//-----------------------------------------------------//

function race(cid, user, m, div, divlow)
{
	var l=div.length+6;
	if (m.length>l) //adding players, other admin stuffs
	{
		m=m.slice(l).trim();
		if (m.startsWith("add"))
		{
			m=m.slice(3).trim();
			if (m.indexOf("|")!=-1)
			{
				var p=m.split("|"); //0 to nick, 1 to serwer
				p[0]=(p[0].toLowerCase()).replace(/ /g,"");
				try //add an exception to situation a person writes down server which doesnt exist
				{
				return_api("https://"+endpoints(p[1])+".api.riotgames.com/lol/summoner/v3/summoners/by-name/"+encodeURIComponent(p[0])+"?api_key="+RITO_KEY, function(id_api) { 
					if (id_api.startsWith("error"))
						send(cid, ":warning: Such player doesn't exist.");
					else 
					{
						var pid=(JSON.parse(id_api)).id;
						return_api("https://"+p[1]+".api.riotgames.com/api/lol/"+p[1]+"/v2.5/league/by-summoner/"+pid+"/entry?api_key="+RITO_KEY, function(div_api) {
							if (div_api.startsWith("error"))
								send(cid, ":x: Unable to retrieve data for "+p[0]+", try again in a few moments.");
							else
							{
								var data=JSON.parse(div_api);
								if (((data[pid][0]).tier).toLowerCase()!=divlow.toLowerCase())
									send(cid, ":no_entry: Player "+p[0].toUpperCase()+" is not "+divlow+" and therefore can not participate. Sob.");
								else
								{
									var newparticipant=p[0].trim().toUpperCase()+"|"+pid+"|"+p[1].trim().toUpperCase();
									fs = require('fs');									
									fs.readFile("race_data/"+div.toLowerCase()+"race.vik", 'utf8', function (err,data) { //a check, if a player isn't already registered in the race
										if (err)
											send(cid, ":x: An unexpected error occured - "+err+" - while getting acces to the Race data. Please try again in a few minutes.");
										else
										{
											if (data.indexOf(pid)!=-1) //if a player with given ID is already registered in this race
												send(cid, ":x: Player "+p[0].toUpperCase()+" is already registered in the "+div+" race.");
											else
											{
												fs.appendFile("race_data/"+div.toLowerCase()+"race.vik", newparticipant+"#", function (err) {
													if (err) 
														send(cid, ":x: An unexpected error occured - "+err+" - while trying to add new participant to the race. Please try again in a few minutes. ");
													else
													{
														console.log("New "+div+" race participant: "+newparticipant);
														send(cid, ":information_source: New participant: "+p[0].toUpperCase());
													}
												});
											}
										}
									});
								}
							}
						});						
					}
				});
				}
				catch(err)
				{
					send(cid, ":x: An unexpected error occured. "+err);
				}
			}
			else 
				send(cid, ":x: Incorrect format of input.");
		}
	}
	else //only race info
	{
		send(cid, ":hourglass_flowing_sand: Getting the **"+div+" Race** data. This might take a while...");
		var data;
		var p=new Array();
		fs = require('fs');
		fs.readFile("race_data/"+div.toLowerCase()+"race.vik", 'utf8', function (err,data) {
			if (err)
				send(cid, "Oops. "+err);
			else
			{
				var fetched=data.split("#");
				m=""; //fetched info here
				
				function SplitLoop(i) //recursive function being an alternative to for loop
				{
					if (i<fetched.length-1) //-1 as the last array is always empty (need to find a more decent way to overcome this somehow)
					{
						var p1=fetched[i].split("|");
						p[i]=new Array(p1[0],p1[1],p1[2], "0", "0"); //0=nick, 1=id, 2=server, 3=points towards classification, 4=description
						return SplitLoop(i+1);
					}
					else
					{
						function ApiLoop(i)
						{
							if (i<p.length)
							{
								var pid=p[i][1];
								return_api("https://"+p[i][2]+".api.riotgames.com/api/lol/"+p[i][2]+"/v2.5/league/by-summoner/"+pid+"/entry?api_key="+RITO_KEY, function(player) {
									if (player.startsWith("error"))
										send(cid, ":x: Unable to retrieve data for "+p[i][0].toUpperCase()+".");
									else
									{
										data=JSON.parse(player);
										var pDiv=romanToInt((data[pid][0]).entries[0].division);
										var pLp=(data[pid][0]).entries[0].leaguePoints;
										p[i][4]=p[i][0]+" - "+(data[pid][0]).tier + " " +pDiv + ", "+pLp +" LP";
										if (((data[pid][0]).tier).toLowerCase()==divlow.toLowerCase())
											p[i][3]=100*pDiv-pLp;
										else 
											p[i][3]=999;
										
										return ApiLoop(i+1);
									}
								});
							}
							else
							{
								try
								{
									var m="\n";
									function JLoop(j)
									{
										if (j<p.length-1)
										{
											function ILoop(i)
											{
												if (i<p.length-1)
												{
													if (p[i][3] > p[i+1][3]) 
													{
														var pom = p[i];
														p[i] = p[i+1]; 
														p[i+1] = pom;
													}
													return ILoop(i+1);
												}
											}
											ILoop(0);
											return JLoop(j+1);
										}
										else
										{
											function WriteLoop(k) 
											{
												if (k<p.length)
												{
													m+="\n**#"+(k+1)+"**: "+p[k][4];
													return WriteLoop(k+1);
												}
											}
											WriteLoop(0);
										}
									}
									JLoop(0);
									sendEmbed(cid, ":trophy: "+div+" Race!", m+"\n\nTo join the "+div+" Race, write !"+div.toLowerCase()+"race add _nick_|_server_ . Disclaimer: you have to be "+divlow+".");
								}
								catch(err)
								{
									send(cid, "Oops. "+err);
								}
							}
						}
						ApiLoop(0);
					}
				}
				SplitLoop(0);
			}
		});
	}
}
function add_role(m, userID, channelID)
{
	var r=m.slice(4); //JUST THE ROLE NAME - !IAM
		r=r.trim();					
	var r_id=0;
	var done=false;	
	var hasrole=false;

	if (r.toLowerCase()=="bad" || r.toLowerCase()=="noob" || r.toLowerCase()=="retard" || r.toLowerCase()=="retarded" || r.toLowerCase()=="moron" || r.toLowerCase()=="idiot") //SOME INNOCENT TROLLING
		send(channelID, "Indeed. You are.");
	else
	{
		if (r.toLowerCase()=="bronze")
			send(channelID, "You aren't, but you truly deserve it.");
		else
		{	
			for (var i in bot.servers[bot.channels[channelID].guild_id].roles)
			{
				if ((bot.servers[bot.channels[channelID].guild_id].roles[i].name).toLowerCase()==r.toLowerCase()) 
				{
					r_id=bot.servers[bot.channels[channelID].guild_id].roles[i].id;
					break;
					}
			}
			if (r_id==0) //IF DESIRED ROLE DOES NOT EXIST
				send(channelID, "Such role doesn\'t exist. Check spelling.");
			else //IF DESIRED ROLE EXISTS
			{
				if (!checkrole(channelID, userID, r_id)) //IF USER DIDN'T HAVE THIS ROLE BEFORE
				{
					try
					{
						bot.addToRole({
							serverID: server_id,
							userID: userID,
							roleID: r_id});
									
						setTimeout(function(){
							if (!checkrole(channelID, userID, r_id)) //FAILED TO ASSIGN ROLE
								send(channelID, "Failed to assign the **"+r.toUpperCase()+"** role.");
							else
								send(channelID, "Role **"+r.toUpperCase()+"** assigned with utmost efficiency.");
						}, 1000);
					}
					catch(err)
					{
						send(channelID, "Failed to assign the **"+r.toUpperCase()+"** role. " + err);
					}
				}
				else
					send(channelID, "You already have the **"+r.toUpperCase()+"** role.");
			}
		}
	}
}
function remove_role(m, userID, channelID)
{
	var r=m.slice(7); //JUST THE ROLE NAME - !IAMNOT
		r=r.trim();					
	var r_id=0;
	var done=false;	
	var hasrole=false;
	
	if (r.toLowerCase()=="bronze")
		send(channelID, "...did you really think you can, like, just stop being Bronze like that? That's... quite amusing.");
	else
	{
		try
		{
			for (var i in bot.servers[bot.channels[channelID].guild_id].roles)
			{
				if (bot.servers[bot.channels[channelID].guild_id].roles[i].name==r) 
				{
					r_id=bot.servers[bot.channels[channelID].guild_id].roles[i].id;
					break;
				}
			}
		}
		catch(err)
		{
			send(channelID, "Finding role for user "+bot.members[userID].name +" - error detected: "+err.toString());
		}
		if (r_id==0) //IF DESIRED ROLE DOES NOT EXIST
			send(channelID,'Such role doesn\'t exist. Check spelling.');
		else //IF DESIRED ROLE EXISTS
		{
			if (checkrole(channelID, userID, r_id)) //IF USER DOES HAVE THIS ROLE
			{
				try
				{
					bot.removeFromRole({
						serverID: server_id,
						userID: bot.users[userID].id,
						roleID: r_id});
								
					setTimeout(function(){
						if (checkrole(channelID, userID, r_id)) //IF FAILED TO REMOVE FROM ROLE
							send(channelID, "Failed to remove the **"+r.toUpperCase()+"** role.");
						else
							send(channelID, "Role **"+r.toUpperCase()+"** removed succesfully.");
					}, 1000);
				}
				catch(err)
				{
					send(channelID, "Failed to remove the **"+r.toUpperCase()+"** role. " + err);
				}
			}
			else
				send(channelID, "Indeed, you aren't.");
		}
	}
}
function add_streaming_role(user, userID, status, game, event) //SERVER+ROLE ID HARDCODED; CHANGE TO BE MORE RESPONSIVE
{
	if(game && game.url) //IF USER IS DETECTED AS STREAMING
	{
		try
		{
			for (var i in event.d.roles)
			{
				if (event.d.roles[i]=="277867725122961408") //CHECKS IF USER HAS VIKTOR STREAMER ROLE
				{
					bot.addToRole({
						serverID: server_id,
						userID: userID,
						roleID: "277436330609344513"});
						
					console.log(user+" - streams \'"+ game.name);
				}
			}
		}		
		catch(err)
		{console.log("- "+user+"- "+userID+" - "+game+" - presence change, streaming detected error - "+err);}
	}
	if (!game || (game && !game.url)) //IF ISN'T IN GAME; OR IS IN GAME BUT DOESN'T STREAM
	{
		try
		{
			for (var i in event.d.roles) 
			{
				if (event.d.roles[i]=="277436330609344513") //CHECKS FOR "STREAMING" ROLE
				{
					bot.removeFromRole({ //REMOVES "STREAMING" ROLE IF ONE HAD IT
						serverID: server_id, 
						userID: userID,
						roleID: '277436330609344513'});
					console.log(user+" stopped streaming.");			
				}
			}
		}
		catch(err)
		{console.log("- "+user+" - "+userID+" - presence change, streaming undetected error - "+err+": "+bot.servers[server_id].members[userID]);}
	}
}
function checkrole(cid, uid, r_id) //CHECKS IF USER HAS A ROLE
{
	for (var i in bot.servers[bot.channels[cid].guild_id].members[uid].roles)
	{
		if (bot.servers[bot.channels[cid].guild_id].members[uid].roles[i]==r_id)
			return true;
	}
	return false;
}

//----------------------------------------------------//
//..........RETURNING API AND OTHER CONSTANTS.........//
//----------------------------------------------------//

function return_api(url, callback)
{
	var request = require('request');
	request(url, function (error, response, body) 
	{
		if (!error && response.statusCode == 200)
			return callback(body);
		else
		{
			try
			{
				return callback("error "+response.statusCode);
			}
			catch(err)
			{
				return callback("error"+err);
			}
		}
	});
}
function endpoints(server)
{
	switch(server.toLowerCase())
	{
		case "br":
			return "br1";
		case "eune":
			return "eun1";
		case "euw":
			return "euw1";
		case "jp":
			return "jp1";
		case "kr":
			return "kr";
		case "lan":
			return "la1";
		case "las":
			return "la2";
		case "na":
			return "na1";
		case "oce":
			return "oc1";
		case "tr":
			return "tr1";
		case "ru":
			return "ru";
		case "pbe":
			return "pbe1";
		default: return 0;
	}
}
function gamemodes(modeid)
{ 
	switch(modeid)
	{
		case 0:
			return " - Custom game";
		case 8:
			return " - Normal Twisted Treeline";
		case 2:
			return " - Normal Blind Pick 5v5";
		case 14:
			return " - Normal Draft Pick 5v5";
		case 4:
			return " - Ranked Solo 5v5";
		case 42:
			return " - Ranked Team 5v5";
		case 31:
			return " - Coop vs AI Intro Bots";
		case 32:
			return " - Coop vs AI Beginner Bots";
		case 33:
			return " - Coop vs AI Intermediate Bots";
		case 400:
			return " - Normal Draft Pick 5v5";
		case 410:
			return " - Ranked Draft Pick 5v5";
		case 420:
			return " - Ranked Solo/Duo 5v5";
		case 440:
			return " - Ranked Flex 5v5";
		case 52:
			return " - Coop vs AI Twisted Treeline";
		default: return "";
	}
}
function romanToInt(number)
{
	if (number=="I")
		return 1;
	else if (number=="II")
		return 2;
	else if (number=="III")
		return 3;
	else if (number=="IV")
		return 4;
	else if (number=="V")
		return 5;
}
function getLevel(level)
{
	switch(level)
	{
		case 1: 
			return ":one:";
		case 2: 
			return ":two:";
		case 3: 
			return ":three:";
		case 4: 
			return ":four:";
		case 5: 
			return ":five:";
		case 6: 
			return ":six:";
		case 7: 
			return ":seven:";
		default:return "?";
	}
}