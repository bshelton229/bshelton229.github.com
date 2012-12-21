task :build => [ :convert ] do
  system 'bundle exec jekyll'
end


task :convert do
  require 'haml'
  # content = File.open(File.expand_path('../about.haml', __FILE__)).read
  Dir['**/_*.haml'].each do |f|
    puts "Building haml for #{f}"
    parser = HamlParser.new(f)
    out_file = File.expand_path("../#{f}", __FILE__).gsub(File.basename(f), File.basename(f).gsub('_', '')).gsub(/\.haml$/, '.html')
    File.open(out_file, 'w+') do |f|
      f.write(parser.data.to_yaml + "---\n") unless parser.data == {}
      engine = Haml::Engine.new(parser.content)
      f.write engine.render
    end
  end
end

require 'jekyll'
require 'pathname'

class HamlParser
  # Include the Jekyll convertible classes
  include Jekyll::Convertible
  attr_accessor :data, :content
  def initialize(name,base=nil)
    @base = base || Pathname.new(File.expand_path(Dir.getwd))
    self.read_yaml(@base, name)
  end
end
