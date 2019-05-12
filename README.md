# Checky (0.3.0.2)
Inspired by [the bot of the same name](https://github.com/RagePeanut/checky), Checky is a cross-browser extension that checks the mentions of your post while you are writing it and warns you of the ones that don't match any user on the Steem blockchain.

Checky helps you replace those wrong mentions quickly and efficiently by letting you pick or write the correct username and automatically change your post's mentions accordingly.

The extension currently interacts with [Busy](https://busy.org/), [Steemit](https://steemit.com/) and [SteemPeak](https://steempeak.com/).

## Download
You can download this extension on the following browsers (click on them to be redirected to the install page).

<p align="center">
  <a href="https://chrome.google.com/webstore/detail/checky-steem-mention-chec/eibflgbddjhgnopgnbpnmgdanljpejdj">
    <img src="https://www.google.com/chrome/static/images/chrome-logo.svg" alt="Chrome" height="65px">
  </a>
</p>

You can also download Checky directly from here and pack it yourself if you want to be extra caucious.

## Features
Here are the modifications made by Checky to the apps' pages it interacts with.

### Editor
A table can be seen just above the `Publish` button. Each of its rows is tied to a wrong mention in your post. If you can't see any table, it means that your post doesn't contain any wrong mention. If you do see the table however, you will notice that you can click on three different buttons for each row. Let's take a look at them!
* **Replace**

  The `Replace` button once clicked will let you access a text field where you can type whatever you want the mention to be replaced by in your post. An image can be seen on the left of the text field, this image, which updates in real time, is the profile picture corresponding to what you type in the text field. This is to help you quickly verify that you wrote the username correctly. Once you are sure you want to replace the wrong mention with what you typed, click on the `Change` button. The `Back` button simply is there to let you go back to the three main buttons.
* **Suggestions**

  The `Suggestions` button once clicked will let you access a drop-down list of existing usernames where you can select the username you meant to type. Just like for the replace button, the profile picture of what you select can be seen on the left of the drop-down list. The usernames suggested are one edit away from the wrong mention, which means they have one letter less, one letter more, one letter changed or two adjacent letters switched. If you can't find the username you meant to type or if you get a "No username found" message, what you meant to type might be two edits away from the wrong mention. In this case, click on `More Suggestions` to populate the drop-down list with existing usernames one and two edits away from the wrong mention. The loading may take a while since the amount of work Checky has to do is significantly heavier when it needs to find usernames two edits away. Once you are sure you want to replace the wrong mention with what you selected, click on the `Change` button. The `Back` button simply is there to let you go back to the three main buttons.
* **Ignore**

  The `Ignore` button once clicked will add the wrong mention to your list of ignored usernames. This list contains all the usernames that Checky must ignore while looking for wrong mentions. It can for example be useful if you often refer to your **Twitter** account in your posts.

### Settings
A page can be accessed to change the settings of Checky on all supported apps. This page is accessible from the regular settings page of all those apps. A few settings are available (with more to come in the future), let's take a look at them!
* **Authorized apps (Busy, Steemit) / Authorize Checky (SteemPeak)**

  This setting lets you choose which apps you want Checky to operate on. At least one of the apps must be checked for the setting change to be saved, otherwise there wouldn't be any reason for the extension to be installed. Don't worry, it has been made impossible for you to end up with the three apps unchecked.
* **Suggestions order**

  This setting lets you pick which order you want the username suggestions to follow. Two options are currently available: *Alphabetical* and *Alphabetical+*. The *alphabetical* sorting is pretty self-explanatory, the other one however isn't. The *alphabetical+* option sorts the suggestions alphabetically but privileges the suggestions starting with the same character ase the wrong mention.
* **Case sensitivity (Busy, Steemit) / Use case sensitive matching (SteemPeak)**

  This setting lets you enable case sensitivity for the extension's mention matcher. If this setting is enabled, Checky doesn't check the mentions containing uppercase characters.
* **Ignored usernames**

  This setting lets you remove usernames from your list of ignored usernames. You can either select the ones you want to remove and then click on the `Remove` button or directly click on the `Remove All` button if you want to reset your list of ignored usernames.

## Social networks
**Steemit:** https://steemit.com/@ragepeanut

**SteemPeak:** https://steempeak.com/@ragepeanut

**Busy:** https://busy.org/@ragepeanut

**Twitter:** https://twitter.com/RagePeanut_

**Steam:** http://steamcommunity.com/id/ragepeanut/


### Follow me on [Steemit](https://steemit.com/@ragepeanut), [SteemPeak](https://steempeak.com/@ragepeanut) or [Busy](https://busy.org/@ragepeanut) to be informed on the new releases and projects.