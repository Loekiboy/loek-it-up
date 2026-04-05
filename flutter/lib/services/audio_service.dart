import 'package:audioplayers/audioplayers.dart';

class AudioService {
  final AudioPlayer _player = AudioPlayer();
  bool _soundEnabled = true;

  void setSoundEnabled(bool enabled) {
    _soundEnabled = enabled;
  }

  Future<void> playCorrect() async {
    if (!_soundEnabled) return;
    try {
      await _player.play(AssetSource('sounds/correct.mp3'));
    } catch (e) {
      print('Error playing correct sound: $e');
    }
  }

  Future<void> playWrong() async {
    if (!_soundEnabled) return;
    try {
      await _player.play(AssetSource('sounds/wrong.mp3'));
    } catch (e) {
      print('Error playing wrong sound: $e');
    }
  }

  Future<void> playSuccess() async {
    if (!_soundEnabled) return;
    try {
      await _player.play(AssetSource('sounds/success.mp3'));
    } catch (e) {
      print('Error playing success sound: $e');
    }
  }

  Future<void> playClick() async {
    if (!_soundEnabled) return;
    try {
      await _player.play(AssetSource('sounds/click.mp3'));
    } catch (e) {
      print('Error playing click sound: $e');
    }
  }

  void dispose() {
    _player.dispose();
  }
}
