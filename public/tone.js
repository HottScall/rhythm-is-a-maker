(function(){
  document.documentElement.addEventListener('mousedown', () => {
    if (Tone.context.state !== 'running') Tone.context.resume();
  });

  const synths = [
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth()
  ];

  synths[0].oscillator.type = 'triangle';
  synths[1].oscillator.type = 'sine';
  synths[2].oscillator.type = 'sawtooth';

  const gain = new Tone.Gain(0.8);
  gain.toMaster();

  synths.forEach(synth => synth.connect(gain));

  const $rows = document.body.querySelectorAll('div > div'),
        notes = ['G5', 'E4', 'C3'];
  let index = 0;


  const active = true;
        inactive = false;

  if(active){
    Tone.Transport.scheduleRepeat(repeat, '8n');
  }

  document.querySelector('.stop').onclick = ()=> {
    Tone.Transport.stop();
    document.querySelector('.powerOn').style.color = 'green';
    document.getElementsByClassName('myCheck').checked = false;
  }

  document.querySelector('.powerOn').onclick = ()=> {
    document.querySelector('.powerOn').style.color = 'red';
    Tone.Transport.start();
    document.querySelector('.powerOn').style.color = 'red';
  }

  function repeat(time) {
    let step = index % 16;
    for (let i = 0; i < $rows.length; i++) {
      let synth = synths[i],
          note = notes[i],
          $row = $rows[i],
          $input = $row.querySelector(`input:nth-child(${step + 1})`);
      if ($input.checked) synth.triggerAttackRelease(note, '8n', time);
    }
    index++;
  }

})();
