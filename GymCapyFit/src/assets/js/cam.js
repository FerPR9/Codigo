import { GymcapyfitService } from 'src/app/services/gymcapyfit.service';

gymService: GymcapyfitService;

let scanner = new Instascan.Scanner({
    video: document.getElementById('preview'),
  });
  scanner.addListener('scan', function (content) {
    console.log(content);
    //window.location.href = content;
    //https://api.qrserver.com/v1/create-qr-code/?data={%22nombre%22:%22Juan%22,%22edad%22:30,%22ciudad%22:%22Bogot%C3%A1%22}&size=250x250
    const objeto = {
      IdEmpleado: 122,
      Fecha: "30/10/2022",
      Hora: 'Dios',
      Tipo: "Entrada",
    };
    
    const objetoJSON = JSON.stringify(objeto);
    console.log("Obj: "+objetoJSON);

    console.log('=============================');
    var emp = JSON.parse(content);
    console.log(emp);
    console.log(emp.edad);
    const a = document.getElementById('data');
    a.text = content;

        

  });
  Instascan.Camera.getCameras()
    .then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    })
    .catch(function (e) {
      console.error(e);
    });