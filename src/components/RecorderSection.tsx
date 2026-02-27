import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, RotateCcw, TrendingUp, AlertCircle } from 'lucide-react';
import { VoiceRecorder } from 'capacitor-voice-recorder';
import type { RecordingData, GenericResponse } from 'capacitor-voice-recorder';
import { motion, AnimatePresence } from 'framer-motion';

const RecorderSection: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<{ score: number; tips: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const requestPermission = async () => {
    try {
      const result: GenericResponse = await VoiceRecorder.requestAudioRecordingPermission();
      return result.value;
    } catch (e) {
      console.error('Permission request failed', e);
      return false;
    }
  };

  const startRecording = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      setError('Microphone permission is required to record.');
      return;
    }

    try {
      const { value } = await VoiceRecorder.canDeviceVoiceRecord();
      if (!value) {
        setError('Your device does not support voice recording.');
        return;
      }

      await VoiceRecorder.startRecording();
      setIsRecording(true);
      setError(null);
      setAnalysis(null);
      setAudioBase64(null);
      setRecordingDuration(0);

      timerRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (e) {
      console.error('Failed to start recording', e);
      setError('Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    try {
      if (timerRef.current) clearInterval(timerRef.current);

      const result: RecordingData = await VoiceRecorder.stopRecording();
      setIsRecording(false);

      if (result.value && result.value.recordDataBase64) {
        setAudioBase64(result.value.recordDataBase64);
        analyzeRecording(result.value.recordDataBase64, recordingDuration);
      }
    } catch (e) {
      console.error('Failed to stop recording', e);
      setError('Failed to save recording.');
    }
  };

  const analyzeRecording = (base64: string, duration: number) => {
    // Simulated Analysis Logic
    // In a real app, this might send to an API or use Web Audio API for FFT analysis
    console.log('Analyzing recording length:', base64.length);

    let score = 70;
    const tips = [];

    if (duration < 3) {
      tips.push("Try a longer sequence to practice your breath control.");
      score -= 10;
    } else if (duration > 15) {
      tips.push("Focus on shorter, more precise bursts for greeting calls.");
      score -= 5;
    }

    // Add randomized tips based on common mistakes
    const commonTips = [
      "Keep your air coming from your diaphragm, not your throat.",
      "Sharpen your 'cut' at the end of each note.",
      "Focus on the rhythm: five to seven notes in descending pitch.",
      "Don't over-call; sometimes silence is more effective.",
      "Make sure you're 'barking' into the call for that raspy mallard sound."
    ];

    // Pick 2-3 random tips
    const shuffled = [...commonTips].sort(() => 0.5 - Math.random());
    tips.push(...shuffled.slice(0, 2));

    score += Math.floor(Math.random() * 20); // Add some variety
    if (score > 100) score = 100;

    setAnalysis({ score, tips });
  };

  const playRecording = () => {
    if (!audioBase64) return;

    const audioSrc = `data:audio/aac;base64,${audioBase64}`;
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play();
    } else {
      const audio = new Audio(audioSrc);
      audioRef.current = audio;
      audio.play();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="bg-white p-6 rounded-2xl shadow-md border border-duck-tan text-center">
        <h2 className="text-2xl font-bold mb-2">Voice Trainer</h2>
        <p className="text-gray-600 mb-6">Record yourself blowing your duck call and get instant feedback.</p>

        <div className="relative flex justify-center items-center h-48">
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.2 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute w-32 h-32 bg-red-500 rounded-full"
              />
            )}
          </AnimatePresence>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-duck-green hover:bg-duck-green/90'
            }`}
          >
            {isRecording ? <Square size={32} className="text-white" /> : <Mic size={32} className="text-white" />}
          </button>
        </div>

        <div className="text-3xl font-mono font-bold mt-4 text-duck-brown">
          {formatTime(recordingDuration)}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2 justify-center">
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {audioBase64 && !isRecording && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-4 rounded-xl shadow-sm border border-duck-tan flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-duck-tan/50 rounded-full flex items-center justify-center text-duck-brown">
              <Mic size={20} />
            </div>
            <div>
              <p className="font-bold">Your Recording</p>
              <p className="text-xs text-gray-500">{formatTime(recordingDuration)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={playRecording}
              className="p-2 bg-duck-green text-white rounded-lg hover:bg-duck-green/90 transition-colors"
            >
              <Play size={20} />
            </button>
            <button
              onClick={() => { setAudioBase64(null); setAnalysis(null); setRecordingDuration(0); }}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </motion.div>
      )}

      {analysis && !isRecording && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-duck-tan"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-duck-orange" />
            <h3 className="text-lg font-bold">Performance Analysis</h3>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-100"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={226}
                  strokeDashoffset={226 - (226 * analysis.score) / 100}
                  className="text-duck-green"
                />
              </svg>
              <span className="absolute text-xl font-bold">{analysis.score}%</span>
            </div>
            <div>
              <p className="font-bold text-duck-green">Great progress!</p>
              <p className="text-sm text-gray-600">Your tone consistency is improving.</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-sm uppercase tracking-wider text-gray-500">Recommendations</p>
            {analysis.tips.map((tip, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-duck-orange shrink-0" />
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RecorderSection;
