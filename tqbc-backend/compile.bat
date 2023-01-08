@REM @echo off

echo "=[-->] Detect artifactId from pom.xml"
for /f %%i in (
    'call mvn -q  --non-recursive "-Dexec.executable=cmd" "-Dexec.args=/C echo ${project.artifactId}" "org.codehaus.mojo:exec-maven-plugin:1.3.1:exec"'
) do set ARTIFACT=%%i
echo %ARTIFACT%
echo "[-->] Detect artifact version from pom.xml"
for /f %%i in (
    'call mvn -q  --non-recursive "-Dexec.executable=cmd" "-Dexec.args=/C echo ${project.version}" "org.codehaus.mojo:exec-maven-plugin:1.3.1:exec"'
) do set VERSION=%%i
echo %VERSION%
echo "[-->] Detect Spring Boot Main class ('start-class') from pom.xml"
for /f %%i in (
    'call mvn -q  --non-recursive "-Dexec.executable=cmd" "-Dexec.args=/C echo ${start-class}" "org.codehaus.mojo:exec-maven-plugin:1.3.1:exec"'
) do set MAINCLASS=%%i
echo %MAINCLASS%


echo "[-->] Cleaning target directory & creating new one"
rmdir /s /q target
mkdir target
mkdir target\native-image

echo "[-->] Build Spring Boot App with mvn package"
call mvn -DskipTests package

echo "[-->] Expanding the Spring Boot fat jar"
set JAR="%ARTIFACT%-%VERSION%.jar"
echo %JAR%
cd target/native-image
jar -xvf ../%JAR% >/dev/null 2>&1
@REM copy -R META-INF BOOT-INF/classes

@REM echo "[-->] Set the classpath to the contents of the fat jar (where the libs contain the Spring Graal AutomaticFeature)"
@REM LIBPATH=`find BOOT-INF/lib | tr '\n' ':'`
@REM CP=BOOT-INF/classes:$LIBPATH

@REM GRAALVM_VERSION=`native-image.cmd --version`
@REM echo "[-->] Compiling Spring Boot App '$ARTIFACT' with $GRAALVM_VERSION"
@REM time native-image.cmd -J-Xmx4G -H:+TraceClassInitialization -H:Name=$ARTIFACT -H:+ReportExceptionStackTraces -Dspring.native.remove-unused-autoconfig=true -Dspring.native.remove-yaml-support=true  -cp $CP $MAINCLASS;
@REM # time native-image \
@REM #   -J-Xmx4G \
@REM #   -H:+TraceClassInitialization \
@REM #   -H:Name=$ARTIFACT \
@REM #   -H:+ReportExceptionStackTraces \
@REM #   -Dspring.native.remove-unused-autoconfig=true \
@REM #   -Dspring.native.remove-yaml-support=true \
@REM #   -cp $CP $MAINCLASS;