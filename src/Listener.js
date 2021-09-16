class Listener {
  constructor(playlistsService, playlistSongsService, mailSender) {
    this._playlistsService = playlistsService;
    this._playlistSongsService = playlistSongsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this._playlistsService.getPlaylists(playlistId);
      const playlistSongs = await this._playlistSongsService.getPlaylistSongs(playlistId);
      const result = await this._mailSender.sendEmail(
        targetEmail,
        playlist,
        JSON.stringify(playlistSongs),
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
