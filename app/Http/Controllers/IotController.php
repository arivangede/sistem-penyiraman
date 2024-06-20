<?php

namespace App\Http\Controllers;

use App\Models\Air;
use App\Models\Command;
use App\Models\Kelembaban;
use App\Models\Volume;
use Illuminate\Http\Request;

class IotController extends Controller
{
    public function writeSensorData(Request $request)
    {
        $kelembaban = $request->input('kelembaban');

        if ($kelembaban) {
            Kelembaban::create([
                'kelembaban' => $kelembaban
            ]);
        }

        return response()->json(['message' => 'Sukses menyimpan data sensor']);
    }

    public function getLatestSensorData()
    {
        $dataKelembaban = Kelembaban::select('kelembaban')->orderBy('id', 'desc')->first();

        if (!$dataKelembaban) {
            return response()->json(['message' => 'tidak ada data kelembaban sensor'], 400);
        }

        return response()->json([
            'kelembaban' => $dataKelembaban->kelembaban,
        ]);
    }

    public function getAllSensorData()
    {
        $data = Kelembaban::orderBy('id', 'desc')->get();

        if (!$data) {
            return response()->json(['message' => 'belum ada data sensor di database'], 400);
        }

        return response()->json(['data' => $data]);
    }

    public function writeVolumeData(Request $request)
    {
        $volumeAir = $request->input('air');
        $volumeCampuran = $request->input('campuran');

        if ($volumeAir && $volumeCampuran) {
            Volume::create([
                'air' => $volumeAir,
                'campuran' => $volumeCampuran,
            ]);
        }

        return response()->json(['message' => 'Sukses menyimpan data volume']);
    }

    public function getLatestVolumeData()
    {
        $volume = Volume::select('air', 'campuran')->orderBy('id', 'desc')->first();

        if (!$volume) {
            return response()->json(['message' => 'tidak ada data kelembaban sensor'], 400);
        }

        return response()->json([
            'air' => $volume->air,
            'campuran' => $volume->campuran
        ]);
    }

    public function getJadwal()
    {
        $dataCampuran = Command::where('campuran', 'hidup')->orderBy('id', 'desc')->get();


        $formattedData = [];


        foreach ($dataCampuran as $data) {
            $formattedData[] = [
                'cts' => $data->created_at
            ];
        }


        return response()->json([
            'formattedData' => $formattedData
        ]);
    }


    public function writeCommand(Request $request)
    {
        $commandCampuran = $request->input('campuran');

        $lastState = Command::orderBy('id', 'desc')->first();

        if ($lastState !== null) {
            if ($commandCampuran == 'mati' && $lastState->campuran == 'mati') {
                return response()->json(['message' => 'state terakhir untuk pompa mati']);
            } else if ($commandCampuran == 'hidup' && $lastState->campuran == 'hidup') {
                return response()->json(['message' => 'state terakhir untuk pompa hidup']);
            }
        }

        Command::create([
            'campuran' => $commandCampuran
        ]);

        return response()->json(['message' => 'Sukses menulis perintah']);
    }


    public function getCommand()
    {
        $action = Command::orderBy('id', 'desc')->first();

        if ($action->campuran == 'hidup') {
            return response()->json(['action' => 'pompa campuran hidup']);
        }

        return response()->json(['action' => 'pompa campuran mati']);
    }
}
