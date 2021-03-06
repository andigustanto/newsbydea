<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use Inertia\Inertia;
use App\Models\News;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = new NewsCollection(
            News::orderBy('created_at', 'desc')->with('users')
                ->paginate(9)
        );

        return Inertia::render('Homepage', [
            'title' => 'AM News - Home',
            'description' => 'Selamat datang!',
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|unique:news|max:255',
            'description' => 'required',
            'category' => 'required',
            'image' => 'required|mimes:jpg,jpeg,png|image|max:2048'
        ]);

        if ($request->hasFile('image')){
            $path = $request->file('image')->storeAs('uploads', str_replace(" ","-",$request->title).'-'.time().'.'.$request->image->extension());
            // $fileName = $request->title.'-'.time().'.'.$request->image->extension();
        }else{
            $path = '';
        }
        

        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->user_id = auth()->user()->id;
        $news->image = $path;
        $news->save();

        return redirect()->back()->with('message', 'Berita berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function show(News $news)
    {
        $news = new NewsCollection(News::orderBy('created_at', 'desc')
            ->with('users')
            ->paginate(9));
        return Inertia::render('Dashboard', [
            'title' => 'Dashboard - News',
            'news' => $news
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function edit(News $news, Request $request)
    {
        $dataEdit = $news->find($request->id);
        return Inertia::render('EditNews', [
            'news' => $dataEdit
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, News $news)
    {
        $id = $request->id;
   
        $news = News::find($id);
        $oldImage = $news->image;

        if ($request->hasFile('image')){
            Storage::delete($oldImage);
            $newImage = $request->file('image')->storeAs('uploads', str_replace(" ","-",$request->title).'-'.time().'.'.$request->image->extension());
        }else{
            $newImage = $oldImage;
        }
        
        News::where('id', $id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'image' => $newImage
        ]);

        return to_route('dashboard')->with('message', 'Update berita berhasil!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function destroy(News $news, Request $request)
    {
        $data = News::find($request->id);
        $oldImage = $data->image;
        Storage::delete($oldImage);
        $data->delete();
        return redirect()->back()->with('message', 'Berita berhasil dihapus');
    }
}
